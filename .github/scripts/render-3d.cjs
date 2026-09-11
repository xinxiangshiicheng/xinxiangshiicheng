// Use the public profile calendar, including its anonymized private activity.
// No repository names or credentials are sent to the third-party renderer.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { spawn } = require('node:child_process');

function parseCalendar(html) {
  const attr = (s, name) => s.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
  const labels = new Map();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attr(match[1], 'for');
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (!id?.startsWith('contribution-day-component-')) continue;
    const count = text.match(/^([\d,]+) contributions? on/);
    if (!count && !/^No contributions on/.test(text)) throw new Error('Unrecognized calendar count');
    labels.set(id, count ? Number(count[1].replaceAll(',', '')) : 0);
  }
  const days = [];
  const levels = ['NONE','FIRST_QUARTILE','SECOND_QUARTILE','THIRD_QUARTILE','FOURTH_QUARTILE'];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const date = attr(match[1], 'data-date');
    if (!date) continue;
    const id = attr(match[1], 'id');
    const level = Number(attr(match[1], 'data-level'));
    if (!labels.has(id) || !levels[level]) throw new Error('Incomplete calendar cell');
    days.push({ date, contributionCount: labels.get(id), contributionLevel: levels[level] });
  }
  days.sort((a,b) => a.date.localeCompare(b.date));
  if (days.length < 350 || new Set(days.map(d=>d.date)).size !== days.length) throw new Error('Incomplete calendar year');
  const weeks = [];
  for (const day of days) {
    if (!weeks.length || new Date(day.date+'T00:00:00Z').getUTCDay() === 0) weeks.push({ contributionDays: [] });
    weeks.at(-1).contributionDays.push(day);
  }
  return { isHalloween:false, totalContributions:days.reduce((n,d)=>n+d.contributionCount,0), weeks };
}

async function main() {
  const args = process.argv.slice(2);
  const option = name => { const i=args.indexOf(name); return i<0 ? undefined : args[i+1]; };
  const root=process.cwd();
  const username=process.env.PROFILE_USERNAME || 'xinxiangshiicheng';
  if (!/^[a-zA-Z0-9-]+$/.test(username)) throw new Error('Invalid profile username');
  let data;
  if (option('--data')) {
    data=JSON.parse(fs.readFileSync(option('--data'),'utf8').replace(/^\uFEFF/,''));
  } else {
    const query=`query { user(login:"${username}") {
      contributionsCollection {
        contributionCalendar { isHalloween totalContributions weeks { contributionDays { contributionCount contributionLevel date } } }
        commitContributionsByRepository(maxRepositories:100) { repository { primaryLanguage { name color } } contributions { totalCount } }
        totalCommitContributions totalIssueContributions totalPullRequestContributions totalPullRequestReviewContributions totalRepositoryContributions
      }
      repositories(first:100,ownerAffiliations:OWNER,privacy:PUBLIC) { edges { cursor } nodes { forkCount stargazerCount } }
    } }`;
    const response=await fetch('https://api.github.com/graphql', {
      method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.GITHUB_TOKEN}`},body:JSON.stringify({query}),signal:AbortSignal.timeout(30000)
    });
    if(!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
    data=await response.json();
    if(data.errors || !data.data?.user) throw new Error('GitHub profile query failed');
  }
  let html;
  if(option('--calendar')) html=fs.readFileSync(option('--calendar'),'utf8');
  else {
    // Date-range parameters select a calendar year; omit them for the rolling profile year.
    const url=`https://github.com/users/${username}/contributions?_=${Date.now()}`;
    const response=await fetch(url,{headers:{'Accept-Language':'en-US','Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
    if(!response.ok) throw new Error(`Public calendar HTTP ${response.status}`);
    html=await response.text();
  }
  data.data.user.contributionsCollection.contributionCalendar=parseCalendar(html);
  const total=data.data.user.contributionsCollection.contributionCalendar.totalContributions;
  // Pass only the schema the renderer needs, not any extra profile fields.
  const safe={data:{user:{contributionsCollection:data.data.user.contributionsCollection,repositories:data.data.user.repositories}}};
  safe.data.user.repositories={edges:[],nodes:safe.data.user.repositories.nodes.map(r=>({forkCount:r.forkCount,stargazerCount:r.stargazerCount}))};
  safe.data.user.contributionsCollection.commitContributionsByRepository=safe.data.user.contributionsCollection.commitContributionsByRepository.map(r=>({contributions:r.contributions,repository:{primaryLanguage:r.repository.primaryLanguage}}));
  const payload=JSON.stringify(safe);
  const server=http.createServer((req,res)=>{
    if(req.method!=='POST'||req.url!=='/graphql'){res.writeHead(404).end();return;}
    req.resume();res.writeHead(200,{'Content-Type':'application/json'});res.end(payload);
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'profile-3d-'));
  try {
    const renderer=path.resolve(option('--renderer')||'.preview/vendor/3d.cjs');
    const child=spawn(process.execPath,[renderer],{cwd:temp,env:{
      PATH:process.env.PATH,SystemRoot:process.env.SystemRoot,
      GITHUB_TOKEN:'local-anonymized-calendar',USERNAME:username,
      GITHUB_ENDPOINT:`http://127.0.0.1:${server.address().port}/graphql`,
      SETTING_JSON:path.join(root,'.github/profile-3d-settings.json')
    },stdio:['ignore','pipe','pipe']});
    let log='';child.stdout.on('data',s=>log+=s);child.stderr.on('data',s=>log+=s);
    const code=await new Promise((resolve,reject)=>{child.on('exit',resolve);child.on('error',reject);});
    if(code!==0) throw new Error(`Renderer failed: ${log.slice(0,1000)}`);
    fs.mkdirSync('profile',{recursive:true});
    fs.copyFileSync(path.join(temp,'profile-3d-contrib/contributions-3d.svg'),'profile/contributions-3d.svg');
    console.log(`3D calendar rendered: ${total} contributions, including anonymous private activity visible on GitHub.`);
  } finally {server.close();}
}
if(require.main===module) main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={parseCalendar};
