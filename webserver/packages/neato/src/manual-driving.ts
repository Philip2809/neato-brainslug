import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Button_Gen3 } from "./neato-enums";

@customElement("manual-driving")
export class ManualDriving extends LitElement {
  static styles = css`

  .manual-driving {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .manual-driving span {
    width: 75%;
    padding: 1rem;
    margin: 1.5rem 0;
    background-color: rgba(127, 127, 127, 0.3);
    border-radius: 0.5rem;
  }

`;

  render() {
    return html`

    <div class="manual-driving">

    <span class="helper">
      You need to turn manual cleaning on by pressing "Start", once the vacuum is in manual cleaning mode you can hold down the different actions! Timeout will stop the current action.
    </span>
        <div style="display:flex;gap:1rem;flex-direction:column;">
                <div style="display:flex;gap:1rem">
                  <custom-button name="Arc Left" press="${Button_Gen3.manual_drive_arc_left_down}" release="${Button_Gen3.manual_drive_arc_left_up}"></custom-button>
                  <custom-button name="Forward" press="${Button_Gen3.manual_drive_forward_down}" release="${Button_Gen3.manual_drive_forward_up}"></custom-button>
                  <custom-button name="Arc Right" press="${Button_Gen3.manual_drive_arc_right_down}" release="${Button_Gen3.manual_drive_arc_right_up}"></custom-button>
                </div>
        
                <div style="display:flex;gap:1rem">
                  <custom-button name="Left" press="${Button_Gen3.manual_drive_turn_left_down}" release="${Button_Gen3.manual_drive_turn_left_up}"></custom-button>
                  <custom-button name="Timeout" click="${Button_Gen3.manual_drive_button_timeout}"></custom-button>
                  <custom-button name="Right" press="${Button_Gen3.manual_drive_turn_right_down}" release="${Button_Gen3.manual_drive_turn_right_up}"></custom-button>
                </div>
        
                <div style="display:flex;gap:1rem">
                  <custom-button name="Start" click="${Button_Gen3.start_manual_cleaning}"></custom-button>
                  <custom-button name="Backward" press="${Button_Gen3.manual_drive_backwards_down}" release="${Button_Gen3.manual_drive_backwards_up}"></custom-button>
                  <custom-button name="Stop" click="${Button_Gen3.stop_cleaning}"></custom-button>
                </div>        
              </div>

    </div>
        
    
        `
  }
}
