import { css } from "lit";

export default css`
  :host {
    position: relative;
  }
  select {
    background-color: inherit;
    color: inherit;
    width: 100%;
    border-radius: 4px;
  }
  option {
    color: currentColor;
    background-color: var(--primary-color, currentColor);
  }
  input[type="range"],
  input[type="text"] {
    width: calc(100% - 3rem);
    height: 0.75rem;
  }
  .range {
    text-align: center;
  }
  .entity-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    transition: all 0.3s ease-out 0s;
    min-height: 40px;
    position: relative;
  }
  .entity-row.expanded {
    min-height: 240px;
  }
  .entity-row:nth-child(2n) {
    background-color: rgba(90, 90, 90, 0.1);
  }
  .entity-row iconify-icon {
    vertical-align: middle;
  }
  .entity-row > :nth-child(1) {
    flex: 0 0 40px;
    color: #44739e;
    line-height: 40px;
    text-align: center;
  }
  .entity-row > :nth-child(2) {
    flex: 1 1 40%;
    margin-left: 16px;
    margin-right: 8px;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .entity-row > :nth-child(3) {
    flex: 1 1 50%;
    margin-right: 8px;
    margin-left: 20px;
    text-align: right;
    display: flex;
    justify-content: space-between;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .entity-row > :nth-child(3) > :only-child {
    margin-left: auto;
  }
  .binary_sensor_off {
    color: rgba(127, 127, 127, 0.7);
  }
  .singlebutton-row button {
    margin: auto;
    display: flex;
  }
  .climate-wrap{
    width: 100%;
    margin: 10px 0 10px 0;
  }
  .climate-row {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    text-align: left;
  }
  .climate-row > select{
    width: 50%;
  }
  .climate-row > label{
    align-content: center;
    width: 150px;
  }
    
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0 !important;
  }
`;
