import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import cssReset from "./css/reset";

const inputRangeID: string = "range";
const currentValueID: string = "rangeValue";
const pressTimeToShowPopup = 500;

@customElement("esp-range-slider")
export class EspRangeSlider extends LitElement {
  private inputRange: HTMLInputElement | null = null;
  private currentValue: HTMLInputElement | null = null;

  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private isPopupInputVisible: boolean = false;

  @property({ type: String }) value = 0;
  @property({ type: String }) min = 0;
  @property({ type: String }) max = 0;
  @property({ type: String }) step = 0;
  @property({ type: String }) name = "";

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    this.inputRange = this.shadowRoot?.getElementById(
      inputRangeID
    ) as HTMLInputElement;

    this.currentValue = this.shadowRoot?.getElementById(
      currentValueID
    ) as HTMLInputElement;
    document.addEventListener('mousedown', (event) => {
      if(!document.querySelector('.popup-number-input')) {
        return;
      }
      const isClickedOutside = !document.querySelector('.popup-number-input')?.contains(event.target as Node);      
      if (isClickedOutside && this.isPopupInputVisible) {
        this.deletePopupInput();
      }
    });    
  }  
  
  protected updated(): void {
    this.updateCurrentValueOverlay();
  }

  onMouseDownCurrentValue(event: MouseEvent): void {
    this.longPressTimer = setTimeout(() => {
      this.showPopupInput(event.pageX, event.pageY);
    }, pressTimeToShowPopup); 
  }
  
  onMouseUpCurrentValue(event: MouseEvent): void {
    if (this.longPressTimer && !this.isPopupInputVisible) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
  
  onTouchStartCurrentValue(event: TouchEvent): void {
    this.longPressTimer = setTimeout(() => {      
      this.showPopupInput(event.touches[0].pageX,event.touches[0].pageY);
    }, pressTimeToShowPopup); 
  }
  
  onTouchEndCurrentValue(event: TouchEvent): void {
    if (this.longPressTimer && !this.isPopupInputVisible) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
  
  deletePopupInput(): void {
    const popupInputElement = document.querySelector('.popup-number-input');
    if (popupInputElement) {
      popupInputElement.remove();
    }
    this.isPopupInputVisible = false;
  }

  showPopupInput(x: number, y: number): void {
    const popupInputElement = document.createElement('input');
    popupInputElement.type = 'number'; 
    popupInputElement.value = this.inputRange.value;
    popupInputElement.min = this.inputRange.min;
    popupInputElement.max = this.inputRange.max;
    popupInputElement.step = this.inputRange.step;
    popupInputElement.classList.add('popup-number-input');

    const styles = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 50px;
    -webkit-appearance: none;
    margin: 0;
    `;  
    popupInputElement.setAttribute('style', styles);
    document.body.appendChild(popupInputElement);

    popupInputElement.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    popupInputElement.addEventListener('change', (ev: Event) =>{
      let input = ev.target as HTMLInputElement;
      this.inputRange.value = input?.value;

      var event = new Event('input');    
      this.inputRange?.dispatchEvent(event);
      var event = new Event('change');    
      this.inputRange?.dispatchEvent(event);
    });

    popupInputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.deletePopupInput();
      }
    });

    popupInputElement.focus();
    this.isPopupInputVisible = true;
  }

  updateCurrentValueOverlay(): void {
    const newValueAsPercent = Number( (this.inputRange.value - this.inputRange.min) * 100 / (this.inputRange.max - this.inputRange.min) ),
    newPosition = 10 - (newValueAsPercent * 0.2);
    this.currentValue.innerHTML = `<span>${this.inputRange?.value}</span>`;
    this.currentValue.style.left = `calc(${newValueAsPercent}% + (${newPosition}px))`;

    const spanTooltip = this.currentValue?.querySelector('span');
    spanTooltip?.addEventListener('mousedown', this.onMouseDownCurrentValue.bind(this));
    spanTooltip?.addEventListener('mouseup', this.onMouseUpCurrentValue.bind(this));
    spanTooltip?.addEventListener('touchstart', this.onTouchStartCurrentValue.bind(this));
    spanTooltip?.addEventListener('touchend', this.onTouchEndCurrentValue.bind(this));

    spanTooltip?.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  onInputEvent(ev: Event): void {
    this.updateCurrentValueOverlay();
  }

  onInputChangeEvent(ev: Event): void {
    this.sendState(this.inputRange?.value);
  }

  sendState(value: string|undefined): void {
    let event = new CustomEvent("state", {
      detail: {
        state: value,
        id: this.id,
      },
    });
    this.dispatchEvent(event); 
  }

  render() {
    return html`
      <div class="range-wrap">
        <label>${this.min || 0}</label>
        <div class="slider-wrap">
          <div class="range-value" id="rangeValue"></div>
            <input
              id="${inputRangeID}"
              type="range"
              name="${this.name}"
              step="${this.step}"
              min="${this.min || Math.min(0, this.value)}"
              max="${this.max || Math.max(10, this.value)}"
              .value="${this.value}"
              @input="${this.onInputEvent}"
              @change="${this.onInputChangeEvent}"
            />
        </div>
        <label style="text-align: left;">${this.max || 100}</label>
      </div>
    `;
  }

  static get styles() {
    return [
      cssReset,
      css`
        :host {
          min-width: 150px;
          flex: 1;
        }
        input[type=range] {
          background: transparent;
          -webkit-appearance: none;
          appearance: none;
          margin: 20px 0;
          width: 100%;
          touch-action: none;
        }
        input[type=range]:focus {
          outline: none;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          animate: 0.2s;
          background: #03a9f4;
          border-radius: 25px;
        }
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          animate: 0.2s;
          background: #03a9f4;
          border-radius: 25px;
        }
        input[type=range]::-ms-track {
          background: transparent;
          width: 100%;
          height: 4px;
          cursor: pointer;
          animate: 0.2s;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        input[type=range]::-ms-fill-lower {
          background: #03a9f4;
          border-radius: 25px;
        }
        input[type=range]::-ms-fill-upper {
          background: #03a9f4;
          border-radius: 25px;
        }
        input[type=range]::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8px;
        }
        input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
          cursor: pointer;
          border: none;
        }
        input[type=range]::-ms-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
          cursor: pointer;
          border: none;
        }
        input[type=range]:focus::-webkit-slider-runnable-track {
          background: #03a9f4;
        }
        input[type=range]:focus::-moz-range-track {
          background: #03a9f4;
        }
        input[type=range]:focus::-ms-fill-lower {
          background: #03a9f4;
        }
        input[type=range]:focus::-ms-fill-upper {
          background: #03a9f4;
        }
        .range-wrap {
          display: flex;
          align-items: center;
        }
        .slider-wrap {
          flex-grow: 1;
          margin: 0px 15px;
          position: relative;
        }
        .range-value {
          position: absolute;
          top: -50%;
        }
        .range-value span {
          padding: 0 3px 0 3px;
          height: 19px;
          line-height: 18px;
          text-align: center;
          background: #03a9f4;
          color: #fff;
          font-size: 11px;
          display: block;
          position: absolute;
          left: 50%;
          transform: translate(-50%, +80%);
          border-radius: 6px;
        }
        @-moz-document url-prefix() {
          .range-value span {
            transform: translate(-50%, +150%);
          }
        }
        .range-value span:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 10px solid #03a9f4;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          margin-top: -1px;
          pointer-events: none;
        }
      `,
    ];
  }
}
