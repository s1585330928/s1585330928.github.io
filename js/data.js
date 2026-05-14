const builds = [
      {
        name: "长弓 + 匕首", role: ["PVE输出", "PVP", "新手推荐"], weapons: ["Longbow", "Dagger"], difficulty: "中", crowd: "喜欢远程输出的新手",
        summary: "远程输出手感好，匕首提供爆发和机动性，适合安全距离输出与灵活走位。", tags: ["远程", "爆发", "机动"],
        weaponBlocks: [
          { label: "武器一 · 长弓", nameEn: "Longbow", detail: "主力输出位：中远距离消耗、单体点名与走位拉扯；被贴脸前尽量保留耐力用于后撤。", skills: { core: ["Ensnaring Arrow", "Strafing", "Deadly Marker", "Decisive Sniping", "Brutal Arrow"], flex: ["Arrow Vortex", "Zephyr's Nock", "Healing Touch", "Purifying Touch"], passive: ["Sniper's Sense", "Steady Aim", "Rapidfire Stance", "Roxie's Arrowhead"] } },
          { label: "武器二 · 匕首", nameEn: "Dagger", detail: "副手爆发与保命：敌人突脸时打短爆发，或用位移技能重新建立长弓输出距离。", skills: { core: ["Shadow Strike", "Cleaving Moonlight", "Inject Venom", "Brutal Incision", "Knife Throwing"], flex: ["Camouflage Cloak", "Ankle Strike", "Fatal Stigma"], passive: ["Assassin's Instincts", "Destructive Fang", "Shadow Walker", "Assassin's Step"] } }
        ]
      },
      {
        name: "剑盾 + 魔杖", role: ["坦克", "新手推荐"], weapons: ["Sword & Shield", "Wand"], difficulty: "低-中", crowd: "副本承伤 / 稳定开荒",
        summary: "偏生存和团队功能，容错率高，适合副本承伤、公会活动和稳定开荒。", tags: ["承伤", "团队", "容错"],
        weaponBlocks: [
          { label: "武器一 · 剑盾", nameEn: "Sword & Shield", detail: "主坦位：稳定仇恨、减伤与短控制；节奏偏「挡—反打—护队友」。", skills: { core: ["Provoking Roar", "Shield Strike", "Chain Hook", "Counter Barrier", "Stalwart Bastion"], flex: ["Shield Throw", "Strategic Rush", "Fierce Clash", "Witty Strike"], passive: ["Resilient Mind", "Impenetrable", "Gerad's Patience", "Morale Boost"] } },
          { label: "武器二 · 魔杖", nameEn: "Wand", detail: "副手辅助：提供应急治疗、驱散与护盾，小队无纯奶时也能稳住血线。", skills: { core: ["Swift Healing", "Clay's Salvation", "Blessed Barrier", "Invincible Wall", "Touch of Despair"], flex: ["Chaotic Shield", "Corrupted Magic Circle", "Fountain of Life", "Cursed Nightmare"], passive: ["Devotion and Emptiness", "Selfless Soul", "Noble Revival", "Vampiric Contract"] } }
        ]
      },
      {
        name: "法杖 + 匕首", role: ["PVE输出", "PVP"], weapons: ["Staff", "Dagger"], difficulty: "中-高", crowd: "追求爆发伤害",
        summary: "法术爆发强，适合清怪和打输出，但对站位、技能循环和资源管理要求更高。", tags: ["法系", "爆发", "AOE"],
        weaponBlocks: [
          { label: "武器一 · 法杖", nameEn: "Staff", detail: "法系主输出：AOE 清场与读条爆发；需熟悉安全输出位与读条窗口。", skills: { core: ["Inferno Wave", "Fireball Barrage", "Chain Lightning", "Judgement Lightning", "Ice Spear"], flex: ["Icebound Tomb", "Frost Smokescreen", "Serial Fire Bombs", "High Focus"], passive: ["Flame Condensation", "Asceticism", "Mana Amp", "Forbidden Sanctuary"] } },
          { label: "武器二 · 匕首", nameEn: "Dagger", detail: "补近战窗口与斩杀：Boss 近身机制或 PVP 贴身时，用法杖控场后匕首补爆发。", skills: { core: ["Brutal Incision", "Cleaving Moonlight", "Umbral Spirit", "Vampiric Strike", "Shadow Strike"], flex: ["Camouflage Cloak", "Phantom Smokescreen", "Block Blade"], passive: ["Destructive Fang", "Wrathful Edge", "Murderous Energy", "Assassin's Instincts"] } }
        ]
      },
      {
        name: "大剑 + 匕首", role: ["PVP", "PVE输出"], weapons: ["Greatsword", "Dagger"], difficulty: "中", crowd: "近战切入玩家",
        summary: "近战压制能力强，适合小规模PVP和切后排，但需要掌握进场和撤退时机。", tags: ["近战", "控制", "切入"],
        weaponBlocks: [
          { label: "武器一 · 大剑", nameEn: "Greatsword", detail: "正面压制：范围伤害、蓄力斩与短控制；负责压血线与逼出敌方技能。", skills: { core: ["Death Blow", "Devastating Tornado", "Ascending Slash", "Stunning Blow", "Valiant Brawl"], flex: ["Devastating Smash", "Precision Dash", "Willbreaker", "Gaia Crash"], passive: ["Barbarian's Dash", "Cold Warrior", "Raging Frenzy", "Victor's Morale"] } },
          { label: "武器二 · 匕首", nameEn: "Dagger", detail: "侧翼收割：大剑打出硬直或残血后，匕首负责追击、斩杀与脱离。", skills: { core: ["Cleaving Moonlight", "Brutal Incision", "Frenzied Sword Dance", "Ankle Strike", "Knife Throwing"], flex: ["Fatal Stigma", "Camouflage Cloak", "Shadow Strike"], passive: ["Assassin's Instincts", "Assassin's Step", "Wrathful Edge"] } }
        ]
      },
      {
        name: "弩 + 匕首", role: ["PVE输出", "PVP"], weapons: ["Crossbow", "Dagger"], difficulty: "高", crowd: "愿意练手法的玩家",
        summary: "高频输出与爆发组合，操作更吃熟练度，上限高但容错相对低。", tags: ["高频", "爆发", "手法"],
        weaponBlocks: [
          { label: "武器一 · 弩", nameEn: "Crossbow", detail: "远程高频输出：靠弹药 / 能量管理与短窗口爆发；站桩少时依赖滑步与技能位移。", skills: { core: ["Quick Fire", "Merciless Barrage", "Mortal Mark", "Multi-Shot", "Nimble Leap"], flex: ["Explosive Trap", "Recoil Shot", "Selfless Diffusion", "Weak Point Shot"], passive: ["Bloodlust Stack", "Ambidexterity", "Eagle Vision", "Nature's Power"] } },
          { label: "武器二 · 匕首", nameEn: "Dagger", detail: "爆发放大器：弩打出硬直或减速后，匕首在近距离放大爆发；失误时用位移兜底。", skills: { core: ["Cleaving Moonlight", "Brutal Incision", "Block Blade", "Shadow Strike", "Fatal Stigma"], flex: ["Camouflage Cloak", "Ankle Strike", "Inject Venom"], passive: ["Destructive Fang", "Shadow Walker", "Assassination Stance", "Assassin's Step"] } }
        ]
      },
      {
        name: "魔杖 + 法杖", role: ["治疗", "PVE输出"], weapons: ["Wand", "Staff"], difficulty: "中", crowd: "组队辅助玩家",
        summary: "兼顾治疗、辅助和法术输出，适合固定队、公会队和喜欢团队贡献的玩家。", tags: ["治疗", "辅助", "法系"],
        weaponBlocks: [
          { label: "武器一 · 魔杖", nameEn: "Wand", detail: "治疗主手：单体急救、群体抬血与增益；团队生存优先于个人毛伤害。", skills: { core: ["Swift Healing", "Clay's Salvation", "Invincible Wall", "Ray of Disaster", "Fountain of Life"], flex: ["Karmic Haze", "Time for Punishment", "Curse Explosion", "Blessed Barrier"], passive: ["Saint's Oath", "Selfless Soul", "Noble Revival", "Wraith's Beckon"] } },
          { label: "武器二 · 法杖", nameEn: "Staff", detail: "输出副手：治疗压力小时切法杖补刀；高压阶段仍以魔杖为主，法杖只打瞬发。", skills: { core: ["Inferno Wave", "Chain Lightning", "Serial Fire Bombs", "Inner Peace", "Infernal Meteor"], flex: ["Fireball Barrage", "Judgement Lightning", "Frost Smokescreen"], passive: ["Manaball Eruption", "Flame Condensation", "Echoic Barrier", "Frost Master"] } }
        ]
      },
      {
        name: "剑盾 + 大剑", role: ["坦克", "PVP"], weapons: ["Sword & Shield", "Greatsword"], difficulty: "中", crowd: "前排控制玩家",
        summary: "承伤、控制和近战压制兼顾，适合团战前排和需要稳定开团的队伍。", tags: ["前排", "控制", "团战"],
        weaponBlocks: [
          { label: "武器一 · 剑盾", nameEn: "Sword & Shield", detail: "主坦与开团：仇恨、减伤、保护技能全在剑盾轮切时优先。", skills: { core: ["Provoking Roar", "Shield Strike", "Immortal Pride", "Stalwart Bastion", "Counter Barrier"], flex: ["Chain Hook", "Shield Survival Technique", "Strategic Rush"], passive: ["Aegis Shield", "Impenetrable", "Skillful Evasion", "Spectrum of Agony"] } },
          { label: "武器二 · 大剑", nameEn: "Greatsword", detail: "副手爆发：坦住核心伤害后，用大剑补压制、收割残血或逼退敌方后排。", skills: { core: ["Devastating Tornado", "Guillotine Blade", "Death Blow", "Stunning Blow", "Willbreaker"], flex: ["Blood Devotion", "DaVinci's Courage", "Devastating Smash"], passive: ["Indomitable Armor", "Robust Constitution", "Vital Force", "Cold Warrior"] } }
        ]
      },
      {
        name: "长弓 + 法杖", role: ["PVE输出", "新手推荐"], weapons: ["Longbow", "Staff"], difficulty: "中", crowd: "远程站桩输出",
        summary: "远程输出覆盖面广，适合喜欢稳定输出和副本刷图的玩家，操作压力相对适中。", tags: ["远程", "刷图", "稳定"],
        weaponBlocks: [
          { label: "武器一 · 长弓", nameEn: "Longbow", detail: "物理远程主力：单体与移动战输出；与法杖错开资源，避免双读条叠压力。", skills: { core: ["Strafing", "Deadly Marker", "Decisive Sniping", "Ensnaring Arrow", "Brutal Arrow"], flex: ["Zephyr's Nock", "Arrow Vortex", "Nature's Blessing"], passive: ["Sniper's Sense", "Rapidfire Stance", "Earth's Blessing", "Distorted Sanctuary"] } },
          { label: "武器二 · 法杖", nameEn: "Staff", detail: "法系补充：处理物理抗性高或多目标阶段；长弓真空期用法杖 DOT 或 AOE 填缝。", skills: { core: ["Inferno Wave", "Chain Lightning", "Infernal Meteor", "Ice Spear", "Judgement Lightning"], flex: ["Frost Smokescreen", "Serial Fire Bombs", "High Focus"], passive: ["Asceticism", "Forbidden Sanctuary", "Flame Condensation", "Mana Amp"] } }
        ]
      }
    ];

    function buildWeaponBlocksHtml(item) {
      if (!item.weaponBlocks || !item.weaponBlocks.length) return "";
      const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
      const skillTableRows = (sk) => {
        const rows = [];
        const pushCat = (label, arr) => {
          (arr || []).forEach((name) => {
            rows.push(`<tr><td class="skill-cat">${esc(label)}</td><td class="skill-name">${esc(name)}</td></tr>`);
          });
        };
        pushCat("核心主动", sk.core);
        pushCat("可选 / 情境", sk.flex);
        pushCat("被动", sk.passive);
        if (!rows.length) return "";
        return `<div class="weapon-skill-table-wrap"><table class="weapon-skill-table"><thead><tr><th>分类</th><th>技能名（游戏内英文）</th></tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
      };
      return item.weaponBlocks.map((w) => {
        const sk = w.skills || {};
        return `
        <div class="weapon-block">
          <h4>${esc(w.label)} <span style="color:var(--muted2);font-weight:700;">${esc(w.nameEn)}</span></h4>
          <p class="weapon-block-desc">${esc(w.detail)}</p>
          ${skillTableRows(sk)}
        </div>`;
      }).join("");
    }

    function buildSearchBlob(item) {
      const parts = [item.name, item.summary, item.crowd, item.weapons.join(" "), item.role.join(" "), item.tags.join(" ")];
      (item.weaponBlocks || []).forEach((w) => {
        parts.push(w.label, w.nameEn, w.detail);
        const sk = w.skills || {};
        ["core", "flex", "passive"].forEach((k) => (sk[k] || []).forEach((t) => parts.push(t)));
      });
      return parts.join(" ").toLowerCase();
    }

    const dungeons = [
      { title: "Solo Dungeons 单人副本", level: "练机制 / 个人成长", summary: "适合熟悉职业循环、Boss技能和基础资源规划，是新手过渡到组队内容的训练场。", tags: ["单人", "成长", "练手"], instances: [] },
      {
        title: "Co-Op Dungeons 组队副本",
        level: "维度回廊（Dimensional Circle）· 6 人",
        summary: "通过「维度回廊」匹配或组队的合作副本，分星级与装等门槛；需分工、打断与机制沟通。下列为游戏内真实副本名（持续补全）。",
        tags: ["6人", "维度回廊", "机制"],
        instances: [
          {
            nameEn: "Specter's Abyss",
            nameZh: "幽影深渊",
            levelMin: 20,
            tier: "Tier 0",
            blurb: "维度合作入门本：Shadowmancer → Riot Squad Captain → Heliber。",
            page: "dungeon-specters-abyss.html"
          }
        ]
      },
      { title: "3-Star Dungeons 高阶副本", level: "满级后 / 高战力挑战", summary: "如 Rancorwood、Halls of Tragedy、Chapel of Madness 等三星合作本，适合放详细攻略、视频、站位图和职业职责拆解。", tags: ["高阶", "挑战", "SEO重点"], instances: [] }
    ];

    const bosses = [
      { name: "世界Boss", type: "Peace / Conflict", time: "按服务器日程", value: "适合做刷新提醒、掉落表和路线建议" },
      { name: "Archboss", type: "大型Boss / 公会内容", time: "按服务器日程", value: "适合做单独专题页，承接高价值搜索" },
      { name: "动态事件", type: "PVE / PVP 活动", time: "循环刷新", value: "适合做活动日历，提升玩家回访" },
      { name: "公会活动", type: "Boonstone / Riftstone", time: "按公会安排", value: "适合做公会战准备清单和职业分工" }
    ];

    /** 全站展示：数据可信度与维护说明（各页可注入） */
    const siteMeta = {
      lastVerified: "2026-05-14",
      summary: "构筑与副本为示例文案；「幽影深渊」机制页为基于公开英文攻略整理的非官方中文速查。Boss 时间表仍为占位。"
    };

    /** 今日页「本周目标」示意表；可随版本替换为真实材料名 */
    const weeklyGoals = [
      { goal: "主手武器核心技能升满", need: "技能书、金币、对应训练材料", source: "日常合约、组队副本、活动代币兑换" },
      { goal: "关键被动与生存技能优先", need: "技能点规划、重置券（若有）", source: "构筑库对照；避免平均加点" },
      { goal: "装等 / 词条门槛达进团线", need: "副本掉落、制造、拍卖行", source: "副本页类型入口；公会分包" },
      { goal: "活动代币不溢出", need: "周常上限、轮换商店", source: "Boss/活动页时间表 + 每日清单勾选" }
    ];

    /**
     * 演示用倒计时锚点：非官方开服时间。若时间已过，脚本会自动按天顺延直至晚于当前时刻。
     * 正式运营请改为真实 ISO 时间或由后台生成。
     */
    const demoCountdown = {
      title: "示例：下一整点自检（演示用）",
      nextIso: "2026-05-14T20:00:00+09:00"
    };

    /** 每日待办：可选 href 链到相关栏目 */
    const todos = [
      { text: "查看今日活动与 Boss 时间", href: "boss.html" },
      { text: "打开今日指挥台汇总（收藏构筑 + 清单）", href: "today.html" },
      { text: "完成日常合约 / 关键资源任务" },
      { text: "消耗副本次数或重要代币", href: "dungeons.html" },
      { text: "检查装备词条与技能成长优先级", href: "builds.html" },
      { text: "参加公会活动或确认公会通知", href: "boss.html" },
      { text: "整理背包、材料和拍卖行物品" }
    ];