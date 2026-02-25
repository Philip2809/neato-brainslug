import { css } from "lit";

export default css`
  .tab-header {
    display: inline-flex;
    max-width:90%;
    font-weight: 400;
    padding-inline: 1.5em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    align-items: center;
    border-radius: 12px 12px 0px 0px;
    background-color: rgba(127, 127, 127, 0.3);
    margin-top: 1em;
    user-select: none;
  }
  .tab-container {
    border: 2px solid rgba(127, 127, 127, 0.3);
    border-radius: 0px 12px 12px 12px;
  }
`;
