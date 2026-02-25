import { css } from "lit";

export default css`
  button,
  .btn {
    cursor: pointer;
    border-radius: 4px;
    color: rgb(3, 169, 244);
    border: none;
    background-color: unset;
    padding: 8px;
    font-weight: 500;
    font-size: 12.25px;
    letter-spacing: 1.09375px;
    text-transform: uppercase;
    margin-right: -8px;
  }

  button:active,
  .btn:active {
    background-image: rgba(127, 127, 127, 0.2);
    transition-duration: 1s;
  }

  button:hover,
  .btn:hover {
    background-color: rgba(127, 127, 127, 0.2);
    transition-duration: 1s;
  }

  .abuttonIsState {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
`;
