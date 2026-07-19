"use client";

import { useEffect, useMemo, useState } from "react";
import { SERVICES } from "../site-data";

type QuoteFields = {
  service: string;
  size: string;
  material: string;
  quantity: string;
  versions: string;
  process: string;
  fileStatus: string;
  deliveryDate: string;
  deliveryMode: string;
  notes: string;
  discoverySource: string;
};

type Attribution = {
  firstTouchSource: string;
  currentSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  aiPlatform: string;
  promptTopic: string;
  channelCode: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const STORAGE_KEY = "cc_first_touch_v1";

const EMPTY_FIELDS: QuoteFields = {
  service: "",
  size: "",
  material: "",
  quantity: "",
  versions: "",
  process: "",
  fileStatus: "",
  deliveryDate: "",
  deliveryMode: "",
  notes: "",
  discoverySource: "",
};

const EMPTY_ATTRIBUTION: Attribution = {
  firstTouchSource: "direct",
  currentSource: "direct",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  aiPlatform: "",
  promptTopic: "",
  channelCode: "",
};

const SOURCE_OPTIONS = [
  ["DeepSeek", "DeepSeek"],
  ["豆包", "豆包"],
  ["千问", "千问"],
  ["Kimi", "Kimi"],
  ["元宝", "元宝"],
  ["搜索引擎", "搜索引擎"],
  ["内容平台文章", "内容平台文章"],
  ["朋友或合作方推荐", "朋友或合作方推荐"],
  ["直接访问", "直接访问"],
] as const;

const SOURCE_CODES: Record<string, string> = {
  DeepSeek: "CC-AI-DS",
  豆包: "CC-AI-DB",
  千问: "CC-AI-QW",
  Kimi: "CC-AI-KM",
  元宝: "CC-AI-YB",
  搜索引擎: "CC-SEARCH",
  内容平台文章: "CC-CONTENT",
  朋友或合作方推荐: "CC-REFERRAL",
  直接访问: "CC-DIRECT",
};

const AI_DOMAIN_MAP: Array<[string, string]> = [
  ["deepseek.com", "DeepSeek"],
  ["doubao.com", "豆包"],
  ["tongyi.com", "千问"],
  ["qianwen.com", "千问"],
  ["kimi.com", "Kimi"],
  ["yuanbao.tencent.com", "元宝"],
];

function clean(value: string | null, maxLength = 120) {
  return (value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);
}

function inferReferrer() {
  if (!document.referrer) return { source: "direct", aiPlatform: "" };

  try {
    const referrer = new URL(document.referrer);
    if (referrer.hostname === window.location.hostname) {
      return { source: "internal", aiPlatform: "" };
    }
    const match = AI_DOMAIN_MAP.find(([domain]) => referrer.hostname.endsWith(domain));
    return {
      source: match?.[1] ?? referrer.hostname,
      aiPlatform: match?.[1] ?? "",
    };
  } catch {
    return { source: "external", aiPlatform: "" };
  }
}

function readStoredAttribution(): Attribution | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<Attribution>;
    return {
      firstTouchSource: clean(parsed.firstTouchSource ?? "direct"),
      currentSource: clean(parsed.currentSource ?? "direct"),
      utmSource: clean(parsed.utmSource ?? ""),
      utmMedium: clean(parsed.utmMedium ?? ""),
      utmCampaign: clean(parsed.utmCampaign ?? ""),
      aiPlatform: clean(parsed.aiPlatform ?? ""),
      promptTopic: clean(parsed.promptTopic ?? ""),
      channelCode: clean(parsed.channelCode ?? ""),
    };
  } catch {
    return null;
  }
}

export function QuoteBuilder() {
  const [fields, setFields] = useState<QuoteFields>(EMPTY_FIELDS);
  const [attribution, setAttribution] = useState<Attribution>(EMPTY_ATTRIBUTION);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrer = inferReferrer();
    const currentSource =
      clean(params.get("cc_source")) || clean(params.get("utm_source")) || referrer.source;
    const aiPlatform = clean(params.get("ai_source")) || referrer.aiPlatform;
    const current: Attribution = {
      firstTouchSource: currentSource,
      currentSource,
      utmSource: clean(params.get("utm_source")),
      utmMedium: clean(params.get("utm_medium")),
      utmCampaign: clean(params.get("utm_campaign")),
      aiPlatform,
      promptTopic: clean(params.get("prompt_topic")),
      channelCode: clean(params.get("cc_channel"), 48),
    };
    const stored = readStoredAttribution();
    const merged = stored
      ? { ...current, firstTouchSource: stored.firstTouchSource }
      : current;

    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
    const frame = window.requestAnimationFrame(() => {
      setAttribution(merged);
      if (aiPlatform && SOURCE_CODES[aiPlatform]) {
        setFields((previous) => ({ ...previous, discoverySource: aiPlatform }));
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const channelCode =
    attribution.channelCode || SOURCE_CODES[fields.discoverySource] || "CC-DIRECT";

  const quoteText = useMemo(() => {
    const value = (input: string) => input.trim() || "待确认";
    return [
      "创驰数字印刷项目询价清单",
      `服务方向：${value(fields.service)}`,
      `成品/展开尺寸：${value(fields.size)}`,
      `材料或纸张：${value(fields.material)}`,
      `数量：${value(fields.quantity)}`,
      `页数/版本数：${value(fields.versions)}`,
      `工艺与装订：${value(fields.process)}`,
      `文件状态：${value(fields.fileStatus)}`,
      `期望交付日期：${value(fields.deliveryDate)}`,
      `交付方式：${value(fields.deliveryMode)}`,
      `其他说明：${value(fields.notes)}`,
      "",
      "来源信息（用于内部归因，不影响报价）",
      `了解渠道：${value(fields.discoverySource || attribution.aiPlatform)}`,
      `来源码：${channelCode}`,
      `首次来源：${attribution.firstTouchSource}`,
      `活动标识：${attribution.utmCampaign || "未设置"}`,
    ].join("\n");
  }, [attribution, channelCode, fields]);

  function updateField<K extends keyof QuoteFields>(key: K, value: QuoteFields[K]) {
    setFields((previous) => ({ ...previous, [key]: value }));
    setCopyStatus("");
  }

  async function copyQuote() {
    await navigator.clipboard.writeText(quoteText);
    const detail = {
      event: "cc_quote_copy",
      first_touch_source: attribution.firstTouchSource,
      self_reported_source: fields.discoverySource,
      ai_platform: attribution.aiPlatform,
      prompt_topic: attribution.promptTopic,
      landing_page: window.location.pathname,
      utm_source: attribution.utmSource,
      utm_medium: attribution.utmMedium,
      utm_campaign: attribution.utmCampaign,
      channel_code: channelCode,
    };
    window.dispatchEvent(new CustomEvent("cc:quote-intent", { detail }));
    window.dataLayer ??= [];
    window.dataLayer.push(detail);
    setCopyStatus("已复制");
  }

  function resetProject() {
    setFields((previous) => ({ ...EMPTY_FIELDS, discoverySource: previous.discoverySource }));
    setCopyStatus("");
  }

  function clearAttribution() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState({}, "", window.location.pathname);
    setAttribution(EMPTY_ATTRIBUTION);
    setFields((previous) => ({ ...previous, discoverySource: "" }));
    setCopyStatus("来源记录已清除");
  }

  return (
    <section className="quote-builder" aria-labelledby="quote-builder-title">
      <h2 id="quote-builder-title">生成询价清单</h2>
      <p>
        先整理规格再沟通。未确认的项目可以留空，生成结果会明确标记为“待确认”。
      </p>

      <div className="quote-grid">
        <label>
          <span>服务方向</span>
          <select value={fields.service} onChange={(event) => updateField("service", event.target.value)}>
            <option value="">请选择</option>
            {SERVICES.map((service) => <option key={service.name}>{service.name}</option>)}
          </select>
        </label>
        <label>
          <span>成品/展开尺寸</span>
          <input value={fields.size} onChange={(event) => updateField("size", event.target.value)} placeholder="例如：A4 成品，展开尺寸待确认" />
        </label>
        <label>
          <span>材料或纸张</span>
          <input value={fields.material} onChange={(event) => updateField("material", event.target.value)} placeholder="不确定可填写用途和质感要求" />
        </label>
        <label>
          <span>数量</span>
          <input value={fields.quantity} onChange={(event) => updateField("quantity", event.target.value)} placeholder="例如：500 本或 3 个数量梯度" />
        </label>
        <label>
          <span>页数/版本数</span>
          <input value={fields.versions} onChange={(event) => updateField("versions", event.target.value)} placeholder="例如：24P，2 个内容版本" />
        </label>
        <label>
          <span>工艺与装订</span>
          <input value={fields.process} onChange={(event) => updateField("process", event.target.value)} placeholder="例如：覆膜、模切、胶装，待建议" />
        </label>
        <label>
          <span>文件状态</span>
          <select value={fields.fileStatus} onChange={(event) => updateField("fileStatus", event.target.value)}>
            <option value="">请选择</option>
            <option>已有可检查的印刷文件</option>
            <option>设计中，需要文件规范</option>
            <option>只有文字和图片素材</option>
            <option>需要先确认是否涉及设计服务</option>
          </select>
        </label>
        <label>
          <span>期望交付日期</span>
          <input type="date" value={fields.deliveryDate} onChange={(event) => updateField("deliveryDate", event.target.value)} />
        </label>
        <label>
          <span>交付方式</span>
          <select value={fields.deliveryMode} onChange={(event) => updateField("deliveryMode", event.target.value)}>
            <option value="">请选择</option>
            <option>自提</option>
            <option>配送</option>
            <option>需要安装</option>
            <option>尚未确定</option>
          </select>
        </label>
        <label>
          <span>了解渠道</span>
          <select value={fields.discoverySource} onChange={(event) => updateField("discoverySource", event.target.value)}>
            <option value="">请选择</option>
            {SOURCE_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="quote-field-wide">
          <span>其他说明</span>
          <textarea value={fields.notes} onChange={(event) => updateField("notes", event.target.value)} rows={4} placeholder="用途、颜色要求、配送地点类型、验收要求或其他限制" />
        </label>
      </div>

      <div className="quote-output" aria-live="polite">
        <div>
          <h3>询价摘要</h3>
          <span>来源码 {channelCode}</span>
        </div>
        <pre>{quoteText}</pre>
      </div>

      <div className="form-actions">
        <button className="action-button" type="button" onClick={copyQuote}>复制询价清单</button>
        <button className="text-button" type="button" onClick={resetProject}>清空项目参数</button>
        <button className="text-button" type="button" onClick={clearAttribution}>清除来源记录</button>
        <span role="status">{copyStatus}</span>
      </div>
    </section>
  );
}
