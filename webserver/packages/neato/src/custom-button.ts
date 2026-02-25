import { html, css, LitElement, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import cssReset from "./css/reset";
import { pressButton } from "./api";
import { entityStore } from "./entity-store";
import { entityConfig } from "./types";



@customElement("custom-button")
export class CustomButton extends LitElement {
  @property({ type: String })
  click = "";
  @property({ type: String })
  press = "";
  @property({ type: String })
  release = "";
  @property({ type: String })
  icon = "";
  @property({ type: String })
  name = "";

  @query("#custom-button")
  customButtom!: HTMLDivElement;

  private unsubscribe?: () => void;
  private entities: {
    click?: entityConfig,
    press?: entityConfig,
    release?: entityConfig,
  } = {}



  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = entityStore.subscribe((entity) => {
      // only re-render when *its* entity changes
      if (entity.unique_id === this.click) this.entities.click = entity;
      if (entity.unique_id === this.press) this.entities.press = entity;
      if (entity.unique_id === this.release) this.entities.release = entity;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    super.disconnectedCallback();
  }

  get entityIds() {
    let i = [];
    if (this.click) i.push(this.click);
    if (this.press) i.push(this.press);
    if (this.release) i.push(this.release);
    return i;
  }


  onClick() {
    if (this.entities.click) pressButton(this.entities.click);
  }

  onMouseDown() {
    if (this.entities.press) pressButton(this.entities.press);
  }

  onMouseUp() {
    if (this.entities.release) pressButton(this.entities.release);
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (!this.customButtom) return;
    if (this.press) {
      this.customButtom.removeEventListener("touchstart", this.onMouseDown.bind(this))
      this.customButtom.addEventListener("touchstart", this.onMouseDown.bind(this))
    }

    if (this.release) {
      this.customButtom.removeEventListener("touchend", this.onMouseUp.bind(this))
      this.customButtom.addEventListener("touchend", this.onMouseUp.bind(this))
    }
  }

  render() {
    // loaded.length !== to_load.length --> show loading...
    if (Object.keys(this.entities).length !== this.entityIds.length) {
      return html`
        <div class="cb loading">
          <iconify-icon icon="mdi:progress-clock" height="24px"></iconify-icon>
          loading…
        </div>
      `;
    }

    return html`
      <div class="cb" @click=${this.onClick} @mousedown=${this.onMouseDown} @mouseup=${this.onMouseUp} id="custom-button">
        <iconify-icon
          icon=${this.icon || this.entities.click?.icon || this.entities.press?.icon || this.entities.release?.icon}
          height="24px">
        </iconify-icon>
        <span>${this.name || this.entities.click?.name || this.entities.press?.name || this.entities.release?.name}</span>
      </div>
    `;
  }

  static get styles() {
    return [
      cssReset,
      css`
        .cb {
          border: .1rem solid gray;
          border-radius: .5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 1rem;
          width: 6rem;
        }

        .cb span {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .cb:hover {
          background-color: rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }

          @media (max-width: 1024px) {
            .cb {
              font-size: 0.8rem;
              width: 5.3rem;
            }
          }
      `,
    ];
  }
}
