# Profile assets

- `profile-banner-v1.png` through `profile-banner-v4.png`: AI-generated with the built-in ImageGen tool, based on character reference images supplied by the profile owner. Generation prompts are preserved alongside each image. These are fan illustrations, not official artwork. Version 4 repairs Miku's lower legs and feet.
- `avatar-original.png` and `avatar-circle.svg`: the profile owner's existing GitHub avatar, with a circular SVG display wrapper.
- `tech-stack.svg` and `dev-tools.svg`: [Skill Icons](https://github.com/tandpfun/skill-icons), MIT license. Downloaded from skillicons.dev.
- Codex and Claude Code marks in `dev-tools.svg`: [Lobe Icons](https://github.com/lobehub/lobe-icons), MIT license, placed in matching dark tiles. See `lobe-icons-LICENSE.txt`.
- Gemini, Cloudflare and Alibaba Cloud marks: also from Lobe Icons.
- CUDA, ESP32, Android and Autodesk Fusion tiles: [Skills Icons](https://github.com/syvixor/skills-icons), MIT license. See `skills-icons-LICENSE.txt`.
- 嘉立创 EDA mark: the brand image served by the [official 嘉立创 EDA website](https://lceda.cn/), used to identify the tool. Brand marks remain the property of their respective owners.
- `contact-*.svg`: static [Shields.io](https://shields.io/docs/static-badges) badges. TODO values are deliberate contact placeholders, not real contact details.
- `../profile/contributions-3d.svg`: generated using [GitHub Profile 3D Contrib](https://github.com/yoshi389111/github-profile-3d-contrib), MIT license, with a custom dark palette.
- `../profile/stats.svg` and `../profile/languages.svg`: generated using [GitHub Stats Extended](https://github.com/stats-organization/github-stats-extended), MIT license, via the 2.1.3 core renderer. Refresh workflow uses [GitHub Readme Stats Action](https://github.com/stats-organization/github-readme-stats-action).

Initial cards use profile data retrieved from GitHub on 2026-09-11. Statistics describe GitHub activity and public repositories; local and unpublished projects are not represented by repository language percentages. Automatic refresh starts after the workflow is published and runs successfully.

The 3D calendar now uses the dates and anonymous counts on GitHub's public contribution page, including private contributions the owner has chosen to display. The radar and repository statistics remain public-only. The calendar adapter passes only data to a local renderer and never passes it a real GitHub credential.
