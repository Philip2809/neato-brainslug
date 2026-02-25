import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import cssReset from "./css/reset";
import { stateOff, stateOn } from "./custom-table";

const checkboxID: string = "checkbox-lever";

@customElement("esp-switch")
export class EspSwitch extends LitElement {
  private checkbox: HTMLInputElement | null = null;

  // Use arrays - or slots
  @property({ type: String }) stateOn = stateOn;
  @property({ type: String }) stateOff = stateOff;
  @property({ type: String }) state = stateOff;
  @property({ type: String }) color = "currentColor";
  @property({ type: Boolean }) disabled = false;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    this.checkbox = this.shadowRoot?.getElementById(
      checkboxID
    ) as HTMLInputElement;
  }

  private isOn(): boolean {
    return this.state === this.stateOn;
  }

  toggle(ev: Event): void {
    const newState = this.isOn() ? this.stateOff : this.stateOn;
    let event = new CustomEvent("state", {
      detail: {
        state: newState,
        id: this.id,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="sw">
        <label>
          <input
            id="${checkboxID}"
            type="checkbox"
            .checked="${this.isOn()}"
            .disabled="${this.disabled}"
            @click="${this.toggle}"
          />
          <span style="color:${this.color}" class="lever"></span>
        </label>
      </div>
    `;
  }

  static get styles() {
    return [
      cssReset,
      css`
        .sw,
        .sw * {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          cursor: pointer;
        }

        input[type="checkbox"] {
          opacity: 0;
          width: 0;
          height: 0;
        }

        input[type="checkbox"]:checked + .lever {
          background-color: currentColor;
          background-image: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.5) 100%
          );
        }

        input[type="checkbox"]:checked + .lever:before,
        input[type="checkbox"]:checked + .lever:after {
          left: 18px;
        }

        input[type="checkbox"]:checked + .lever:after {
          background-color: currentColor;
        }

        input[type="checkbox"]:not(:checked) + .lever:after {
          background-color: rgba(127, 127, 127, 0.5);
        }

        .lever {
          content: "";
          display: inline-block;
          position: relative;
          width: 36px;
          height: 14px;
          background-image: linear-gradient(
            0deg,
            rgba(127, 127, 127, 0.5) 0%,
            rgba(127, 127, 127, 0.5) 100%
          );
          background-color: inherit;
          border-radius: 15px;
          transition: background 0.3s ease;
          vertical-align: middle;
        }

        .lever:before,
        .lever:after {
          content: "";
          position: absolute;
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          left: 0;
          top: -3px;
          transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease,
            transform 0.1s ease;
        }

        .lever:before {
          background-color: currentColor;
          background-image: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.9) 100%
          );
        }

        .lever:after {
          background-color: #f1f1f1;
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }

        input[type="checkbox"]:checked:not(:disabled) ~ .lever:active::before,
        input[type="checkbox"]:checked:not(:disabled).tabbed:focus
          ~ .lever::before {
          transform: scale(2.4);
          background-color: rgba(255, 255, 255, 0.9) 0%;
          background-image: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.9) 100%
          );
        }

        input[type="checkbox"]:not(:disabled) ~ .lever:active:before,
        input[type="checkbox"]:not(:disabled).tabbed:focus ~ .lever::before {
          transform: scale(2.4);
          background-color: rgba(0, 0, 0, 0.08);
        }

        input[type="checkbox"][disabled] + .lever {
          cursor: default;
          background-color: rgba(0, 0, 0, 0.12);
        }

        input[type="checkbox"][disabled] + .lever:after,
        input[type="checkbox"][disabled]:checked + .lever:after {
          background-color: #949494;
        }
      `,
    ];
  }
}
