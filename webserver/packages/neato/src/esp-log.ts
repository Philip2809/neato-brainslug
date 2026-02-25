import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import cssTab from "./css/tab";

interface recordConfig {
  type: string;
  level: string;
  tag: string;
  detail: string;
  when: string;
}

@customElement("esp-log")
export class DebugLog extends LitElement {
  @property({ type: Number }) rows = 10;
  @property({ type: String }) scheme = "";
  @state() logs: recordConfig[] = [];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    window.source?.addEventListener("log", this.handleLog);
  }

  disconnectedCallback(): void {
    window.source?.removeEventListener("log", this.handleLog);
    super.disconnectedCallback();
  }

  handleLog = (e: Event) => {
    const messageEvent = e as MessageEvent;
    const d: String = messageEvent.data;

    const types: Record<string, string> = {
      "[1;31m": "e",
      "[0;33m": "w",
      "[0;32m": "i",
      "[0;35m": "c",
      "[0;36m": "d",
      "[0;37m": "v",
    };

    // Extract the type from the color code
    const type = types[d.slice(0, 7)];
    if (!type) {
      // No color code, skip
      return;
    }

    // Extract content without color codes and ANSI termination
    const content = d.slice(7, d.length - 4);

    // Split by newlines to handle multi-line messages
    const lines = content.split('\n');

    // Process the first line to extract metadata
    const firstLine = lines[0];
    const parts = firstLine.slice(3).split(":");
    const tag = parts.slice(0, 2).join(":");
    const firstDetail = firstLine.slice(5 + tag.length);
    const level = firstLine.slice(0, 3);
    const when = new Date().toTimeString().split(" ")[0];


    // Create a log record for each line
    lines.forEach((line, index) => {
      console.log("ESP_LOG", line);
      const record = {
        type: type,
        level: level,
        tag: tag,
        detail: index === 0 ? firstDetail : line,
        when: when,
      } as recordConfig;
      this.logs.push(record);
    });

    this.logs = this.logs.slice(-this.rows);
  }

  render() {
    return html`
      <div 
        class="tab-header"
        @dblclick="${this._handleTabHeaderDblClick}"
      >
        Debug Log
      </div>
      <div class="tab-container">
        <div class="logs" color-scheme="${this.scheme}">
          <div class="thead trow">
            <div>Time</div>
            <div>Level</div>
            <div>Tag</div>
            <div>Message</div>
          </div>
          <div class="tbody">
            ${this.logs.map(
      (log: recordConfig) =>
        html`
              <div class="trow ${log.type}">
                <div>${log.when}</div>
                <div>${log.level}</div>
                <div>${log.tag}</div>
                <div>${log.detail}</div>
              </td>
            `
    )}
          </div>
        </div>
      </div>
    `;
  }

  _handleTabHeaderDblClick(e: Event) {
    const doubleClickEvent = new CustomEvent('log-tab-header-double-clicked', {
      bubbles: true,
      composed: true,
    });
    e.target?.dispatchEvent(doubleClickEvent);
  }

  static get styles() {
    return [
      cssTab,
      css`
        .thead,
        .tbody .trow:nth-child(2n) {
          background-color: rgba(127, 127, 127, 0.05);
        }
        .trow div {
          font-family: monospace;
          width: 100%;
          line-height: 1.2rem;
        }
        .trow {
          display: flex;
        }
        .thead {
          line-height: 1rem;
        }
        .thead .trow {
          text-align: left;
          padding: 0.25rem 0.5rem;
        }
        .trow {
          display: flex;
        }
        .trow > div {
          align-self: flex-start;
          padding-right: 0.25em;
          flex: 2 0;
          min-width: 70px;

        }
        .trow > div:nth-child(2) {
          flex: 1 0;          
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 40px;
        }
        .trow > div:nth-child(3) {
          flex: 3 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .trow > div:last-child {
          flex: 15 0;
          padding-right: 0em;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        pre {
          margin: 0;
        }
        .v {
          color: #888888;
        }
        .d {
          color: #00dddd;
        }
        .c {
          color: magenta;
        }
        .i {
          color: limegreen;
        }
        .w {
          color: yellow;
        }
        .e {
          color: red;
          font-weight: bold;
        }
        .logs[color-scheme="light"] {
          font-weight: bold;
        }
        .logs[color-scheme="light"] .w {
          color: #cccc00;
        }
        .logs[color-scheme="dark"] .d {
          color: #00aaaa;
        }
        .logs {
          overflow-x: auto;
          border-radius: 12px;
          border-width: 1px;
          border-style: solid;
          border-color: rgba(127, 127, 127, 0.12);
          transition: all 0.3s ease-out 0s;
          font-size: 14px;
          padding: 16px;
        }
        @media (max-width: 1024px) {
          .trow > div:nth-child(2) {
            display: none !important;
          }
        }
      `,
    ];
  }
}
