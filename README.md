<img src="assets/profile-banner-v4.png" alt="AI-generated 2D illustration of Luo Tianyi, Hatsune Miku, Neuro-sama and Evil Neuro on a quiet night veranda" width="100%" />

## Hi, I'm xinxiangshicheng / 心想事成 👋

<img align="right" src="assets/avatar-circle.svg" alt="心想事成's avatar" width="280" height="248" />

Electronic Information Engineering · Embedded Systems<br />
PCB Design &amp; Mechanical Design · Homelab &amp; Self-hosting<br />
Deep Learning · Reinforcement Learning · Heterogeneous Inference<br />

🎵 **Hatsune Miku · 洛天依** — 华风夏韵，洛水天依<br />
💜 **Neuro-sama &amp; Evil Neuro** · The Swarm<br />
🎮 **Minecraft &amp; Stardew Valley &amp; Steam**<br />
🎧 **神のまにまに &amp; 勾指起誓**

<!-- 联系方式占位：将下面对应的 img 行替换为带链接的徽章，填写自己的邮箱或主页地址。
Email example: [![Email](https://img.shields.io/static/v1?label=Email&message=qiuqiumc163%40gmail.com&color=244752&labelColor=242938&style=flat)](mailto:your-name@example.com)
QQ/Bilibili: use the same badge format with your account name and profile URL. TODO badges intentionally have no links.
-->
<br />
<img src="assets/contact-email.svg" alt="Email: TODO" />
<!-- <img src="assets/contact-qq.svg" alt="QQ: TODO" />
<img src="assets/contact-bilibili.svg" alt="Bilibili: TODO" /> 先注掉先不放:) -->
<br clear="right" />

## 💻 Software & AI

- **Heterogeneous MoE Inference Runtime** <sub>[WIP]</sub> — Implemented end-to-end CPU/GPU inference across all 32 layers of Phi-tiny-MoE, with 512 experts stored in pinned host memory, GPU expert caching, and speculative prefetching. Validated a 4,080-token chunked prefill followed by 16 decode steps, reaching a logical KV length of 4,096 tokens; peak VRAM during prefill was **3.421 GiB** on an 8 GiB RTX 5060 Laptop GPU. Next: quantized expert storage and on-demand loading for Qwen3-30B-A3B.Ultimate goal: enable cost-effective serving of ultra-large frontier models (e.g., Kimi, GLM) on accessible server-grade hardware.
- **Smart Car Control & Navigation** <sub>[Private]</sub> — Designed the vehicle's software architecture and state machine for the smart car competition. Prototyped A* path planning for a Mecanum-wheel chassis in Python, then rewrote it entirely in C and deployed it to the microcontroller for real-time navigation.
- **Sokoban Simulation & RL** <sub>[Private]</sub> — Built custom Sokoban simulation environments using Gymnasium, Pygame, and Isaac Sim, together with a random map generator. Developed a PyTorch reinforcement learning pipeline to explore puzzle solving and long-horizon planning in complex grid environments.
- **[WearBili player](https://github.com/xinxiangshiicheng/xinxiangshicheng_wearbili_player)** — An open-source smartwatch video player using Android MediaPlayer.
- **[API relay](https://github.com/xinxiangshiicheng/apiconversation_xinxiangshicheng)** — An API relay for 小抬腕.
- **Homelab & Minecraft** — Running self-hosted services, a NAS, local language models, and modded Minecraft servers.

## 🔧 Hardware

- **SMB storage switching board** <sub>[WIP]</sub> — Designed a CH32-based board with a 100 Mbps Ethernet PHY and dual A/B storage, enabling remote file transfer over SMB and seamless switching of the storage mounted by an industrial printing machine.
- **Color matching light booth** <sub>[WIP]</sub> — Redesigned the sheet metal enclosure and circuitry to maintain **2,000 ± 250 lux** across the viewing surface and block ambient light. The cost per light tube was roughly half that of comparable products.
- **E-paper clock / watch** <sub>[Code not public]</sub> — Designed and built an e-paper clock with custom C++ drivers over SPI, SD card support, bitmap fonts, and text and image rendering. Adapted GxEPD for unsupported panels and integrated LVGL interfaces.
- **Printing equipment electronics** <sub>[Code not public]</sub> — Reverse-engineered communication boards and designed replacement console panels for Heidelberg presses, plus serial interface boards connecting printing machines to PCs.

## 🧩 Technology Stack

<img src="assets/tech-stack.svg" alt="Python, C++, C, Java, Kotlin, Rust, JavaScript, HTML, CSS, Vue, PyTorch, CUDA, Arduino, ESP32, Android, MySQL, Linux, Docker, Cloudflare, Alibaba Cloud" />

CH32 · TC264 · LVGL · Gymnasium · Pygame

## 🛠️ Developer Tools

<img src="assets/dev-tools.svg" alt="VS Code, IntelliJ IDEA, PyCharm, CLion, Android Studio, Git, GitHub, Bash, PowerShell, CMake, Codex, Claude Code, Gemini, Autodesk Fusion, 嘉立创 EDA, AutoCAD, Figma, Photoshop, Premiere Pro, After Effects" />

PCB Design · Soldering

## 📊 GitHub Activity

<a href="https://github.com/xinxiangshiicheng"><img align="top" src="profile/stats.svg" alt="GitHub stars, commits, pull requests and issues" width="54%" /></a>
<a href="https://github.com/xinxiangshiicheng?tab=repositories"><img align="top" src="profile/languages.svg" alt="Languages in public non-fork repositories" width="43%" /></a>

<img src="profile/contributions-3d.svg" alt="3D contribution calendar with activity radar, language breakdown, stars and forks" width="100%" />

<sub>Calendar includes anonymous private contributions. Repository, language and radar statistics cover public activity.</sub>

---

<sub>Banner illustration generated with AI . / 顶部插画由 AI 生成。</sub>
