// Render already-fetched public aggregates; this step needs no GitHub credential.
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const [dataFile,coreDirectory]=process.argv.slice(2);
if(!dataFile||!coreDirectory) throw new Error('Usage: render-cards.mjs DATA_JSON CORE_DIRECTORY');
const core=path.resolve(coreDirectory);
const {renderStatsCard}=await import(pathToFileURL(path.join(core,'build/cards/stats.js')));
const {renderTopLanguages}=await import(pathToFileURL(path.join(core,'build/cards/top-languages.js')));
const {data}=JSON.parse(readFileSync(dataFile,'utf8').replace(/^\uFEFF/,''));
const user=data.user;
const repos=user.repositories.nodes.filter(r=>!r.isFork);
const palette={bg_color:'0d1117',title_color:'8fcbd3',text_color:'c9d1d9',icon_color:'74b7c7',border_color:'30363d',border_radius:8,disable_animations:true};
const stats={
 name:user.name||'xinxiangshicheng',
 totalStars:repos.reduce((n,r)=>n+r.stargazerCount,0),
 totalCommits:user.thisYear.totalCommitContributions,
 totalIssues:data.issues.issueCount,totalPRs:data.prs.issueCount,
 contributedTo:user.contributionsCollection.commitContributionsByRepository.length,
 rank:{level:'',percentile:100}
};
writeFileSync('profile/stats.svg',renderStatsCard(stats,{...palette,custom_title:'GitHub Stats',show_icons:true,hide_rank:true,card_width:440,commits_year:new Date().getUTCFullYear()},process.env.PROFILE_USERNAME||'xinxiangshiicheng'));
const langs={};
for(const r of repos) for(const {size,node} of r.languages.edges){
 langs[node.name]??={name:node.name,size:0,color:node.color||'#8fcbd3'};
 langs[node.name].size+=size;
}
writeFileSync('profile/languages.svg',renderTopLanguages(langs,{...palette,layout:'compact',card_width:350,langs_count:6,custom_title:'Public Repo Languages'}));
console.log('Rendered stats and language cards from public aggregates.');
