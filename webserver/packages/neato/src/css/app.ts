import { css } from "lit";

export default css`

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding-bottom: 2rem;
  }

  
  .main-buttons {
    display: grid;
    gap: 1rem;
    justify-content: center;
    grid-template-columns: auto auto auto auto;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 1024px) {
    .main-grid {
      grid-template-columns: 1fr;
    }

    .main-buttons {
      gap: 0.5rem;
      grid-template-columns: auto auto auto;
    }
  }

  .flex-grid-half {
    display: grid;
    grid-template-columns: 700px 2fr;
  }
  .flex-grid-half.expanded_entity,
  .flex-grid-half.expanded_logs {
    grid-template-columns: 1fr;
  }
  .flex-grid-half .col {
    margin: 8px;
  }
  .flex-grid-half .col:nth-child(2) {
    overflow: hidden;
  }
  .flex-grid-half.expanded_logs .col:nth-child(1) {
    display: none;
  }
  .flex-grid-half.expanded_entity .col:nth-child(2) {
    display: none;
  }

  @media (max-width: 1024px) {
    .flex-grid,
    .flex-grid-half {
      display: block;
    }
    .flex-grid-half .col {
      width: 100% !important;
      margin: 0 0 10px 0 !important;
      display: block !important;
    }
  }

  * {
    box-sizing: border-box;
  }
  .flex-grid {
    margin: 0 0 20px 0;
  }
  h1 {
    text-align: center;
    width: 100%;
    line-height: 1.1em;
    margin-block: 0.25em;
  }
  header div {
    text-align: center;
    width: 100%;
  }
  header #logo,
  header iconify-icon {
    float: right;
    font-size: 2.5rem;
    color: rgba(127, 127, 127, 0.5);
  }
  header #logo {
    float: left;
    color: rgba(127, 127, 127, 0.5);
  }
  .connected {
    color: rgba(0, 157, 16, 0.75);
  }
  esp-logo {
    float: left;
    line-height: 1em;
    font-size: initial;
  }
  form {
    display: flex;
    justify-content: space-between;
    background-color: rgba(127, 127, 127, 0.05);
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(127, 127, 127, 0.12);
  }
  form .btn {
    margin-right: 0px;
  }

  .helper {
      width: 75%;
      padding: 1rem;
      margin: .3rem 0;
      background-color: rgba(127, 127, 127, 0.3);
      border-radius: 0.5rem;
    }
  
`;
