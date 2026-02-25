import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { entityConfig } from "./types";
import { entityStore } from "./entity-store";
import { setText } from "./api";

@customElement("esp-schedule")
export class WeeklySchedule extends LitElement {
    static styles = css`
  :host {
    display: block;
    /* max-width: 420px; */
  }

  .row {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
  }

  .row.global {
    grid-template-columns: 1fr auto;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 8px;
  }

  label {
    font-size: 0.95rem;
    font-weight: bold;
  }

  .day-disabled label {
    opacity: 0.5;
  }

  input[type="text"] {
    background: #2b2b2b;
    color: #fff;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 6px 8px;
    font-size: 0.9rem;
    width: 70px;
    text-align: center;
  }

  input[type="text"]:disabled {
    opacity: 0.4;
  }

  .time {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .time input {
    width: 36px;
    padding: 6px 4px;
    text-align: center;
    font-size: 0.9rem;
  }

  .hour,
  .minute {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sep {
    opacity: 0.6;
  }

  .arrow {
    border: none;
    background: transparent;
    color: #aaa;
    font-size: 10px;
    line-height: 10px;
    cursor: pointer;
  }

  .arrow:hover {
    color: #6aa9ff;
  }

  .arrow:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .switch {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 999px;
    background: #555;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .switch::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s ease;
  }

  .switch.on {
    background: #3b82f6;
  }

  .switch.on::after {
    transform: translateX(20px);
  }
`;
    
@property({ type: String }) entityId = "text-scheduleset";
    private unsubscribe?: () => void;
    private entity?: entityConfig;

    connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = entityStore.subscribe(() => {
            const entity = entityStore.get(this.entityId);
            if (entity) {
                this.entity = entity;
                this.setFromString(this.entity.value);
            }
        });
    }

    disconnectedCallback() {
        this.unsubscribe?.();
        super.disconnectedCallback();
    }

    private days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    @state() globalEnabled = true;
    @state() dayEnabled = Array(7).fill(true);
    @state() values = Array(7).fill(0); // 0–143

    private buildFlags(): number {
        let flags = this.globalEnabled ? 1 : 0;
        this.dayEnabled.forEach((en, i) => {
            if (en) flags |= 1 << (i + 1);
        });
        return flags;
    }

    private scheduleString(): string {
        const flags = this.buildFlags();
        return [
            flags,
            ...this.values,
        ].join(",");
    }

    private emit() {
        const value = this.scheduleString();
        console.log(value);

        if (!this.entity) return;
        this.requestUpdate();
        setText(this.entity, value);
    }

    setFromString(str: string) {
        const parts = str.split(",").map(s => Number(s.trim()));

        // safety check
        if (parts.length !== 8 || parts.some(isNaN)) return;

        const flags = parts[0];
        this.globalEnabled = (flags & 0x01) === 0x01; // first bit

        for (let i = 0; i < 7; i++) {
            this.dayEnabled[i] = ((flags >> (i + 1)) & 0x01) === 0x01;
            this.values[i] = this.clampValue(parts[i + 1]);
        }

        this.requestUpdate();
    }

    clampValue(v: number) {
        if (isNaN(v)) return 0;
        if (v < 0) return 0;
        if (v > 143) return 143;
        return v;
    }

    private valueToHM(v: number) {
        return {
            h: Math.floor(v / 6),
            m: (v % 6) * 10,
        };
    }

    private pad2(n: number): string {
        return String(n).padStart(2, "0");
    }

    private roundMinute(m: number): number {
        m = Math.round(m / 10) * 10;
        if (m < 0) return 0;
        if (m > 50) return 50;
        return m;
    }

    private hmToValue(h: number, m: number): number | null {
        if (h < 0 || h > 23) return null;
        m = this.roundMinute(m);
        return h * 6 + m / 10;
    }

    private adjustMinute(i: number, delta: number) {
        const { h, m } = this.valueToHM(this.values[i]);
        let nm = m + delta;

        if (nm > 50) nm = 50;
        if (nm < 0) nm = 0;

        const v = this.hmToValue(h, nm);
        if (v !== null) {
            this.values[i] = v;
            this.emit();
        }
    }

    private adjustHour(i: number, delta: number) {
        const { h, m } = this.valueToHM(this.values[i]);
        let nh = h + delta;

        if (nh < 0) nh = 23;
        if (nh > 23) nh = 0;

        const v = this.hmToValue(nh, m);
        if (v !== null) {
            this.values[i] = v;
            this.emit();
        }
    }

    render() {
        if (!this.entity) return html `<span>loading...</span>`
        return html`
        <div class="row global">
            <label>ESP Schedule</label>
            <div class="switch ${this.globalEnabled ? " on" : ""}" @click=${() => {
                this.globalEnabled = !this.globalEnabled;
                this.emit();
            }}></div>
            </div>

            ${this.days.map((day, i) => html`
                <div class="row ${(!this.dayEnabled[i] || !this.globalEnabled) ? " day-disabled" : ""}">
                    <div class="switch ${this.dayEnabled[i] ? " on" : ""}" @click=${() => {
                    this.dayEnabled[i] = !this.dayEnabled[i];
                    this.emit();
                }}></div>
                <label>${day}</label>

                <div class="time">
                    <div class="hour">
                        <button class="arrow" @click=${() => this.adjustHour(i, +1)} ?disabled=${!this.dayEnabled[i] || !this.globalEnabled}>▲</button>
                        <input type="text" inputmode="numeric" maxlength="2" readonly .value=${this.pad2(this.valueToHM(this.values[i]).h)}
                            ?disabled=${!this.dayEnabled[i] || !this.globalEnabled} @blur=${(e: any) => {
                    let h = Number(e.target.value);
                    if (isNaN(h)) h = 0;
                    if (h < 0) h = 0; if (h > 23) h = 23;

                    const { m } = this.valueToHM(this.values[i]);
                    const v = this.hmToValue(h, m);
                    if (v !== null) {
                        this.values[i] = v;
                        e.target.value = this.pad2(h);
                        this.emit();
                    }
                }}/>
                        <button class="arrow" @click=${() => this.adjustHour(i, -1)}    ?disabled=${!this.dayEnabled[i] || !this.globalEnabled}>▼</button>
                    </div>


                    <span class="sep">:</span>
                    <div class="minute">
                        <button class="arrow" @click=${() => this.adjustMinute(i, +10)} ?disabled=${!this.dayEnabled[i] || !this.globalEnabled}>▲</button>
                        <input type="text" inputmode="numeric" maxlength="2" readonly .value=${this.pad2(this.valueToHM(this.values[i]).m)}
                            ?disabled=${!this.dayEnabled[i] || !this.globalEnabled} @blur=${(e: any) => {
                    let m = Number(e.target.value);
                    if (isNaN(m)) m = 0;

                    const { h } = this.valueToHM(this.values[i]);
                    const v = this.hmToValue(h, m);
                    if (v !== null) {
                        const { m: rounded } = this.valueToHM(v);
                        this.values[i] = v;
                        e.target.value = this.pad2(rounded);
                        this.emit();
                    }
                }}/>
                        <button class="arrow" @click=${() => this.adjustMinute(i, -10)} ?disabled=${!this.dayEnabled[i] || !this.globalEnabled}>▼</button>
                    </div>
                </div>
            </div>
        `)}`;
    }
}
