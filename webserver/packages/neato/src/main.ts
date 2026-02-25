import './neato-entry';

// const pickerHTML =  '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#1c1c1c;color:#eee;padding:16px}.container{text-align:center;max-width:400px;width:100%}h1{font-weight:400;font-size:1.4rem;margin-bottom:24px;color:#f5f5f5}.buttons{display:flex;flex-direction:column;gap:16px}.buttons-row{display:flex;gap:12px;justify-content:center}button{display:flex;align-items:center;justify-content:center;gap:8px;padding:16px 24px;font-size:1rem;font-weight:500;border:1px solid #333;border-radius:10px;cursor:pointer;background:#2c2c2c;color:#f5f5f5;transition:all .2s;box-shadow:0 2px 4px rgba(0,0,0,.3);min-height:48px}button:hover{background:#3a3a3a;box-shadow:0 4px 8px rgba(0,0,0,.4)}.neato{font-size:1.2rem;padding:18px 28px;background:#07c;border:1px solid #005fa3}.neato:hover{background:#005fa3}.esphome{background:#444;border:1px solid #555;flex:1}.esphome:hover{background:#555}.custom-link{display:flex;gap:8px;margin-top:16px}.custom-link input{flex:1;padding:12px;border-radius:8px;border:1px solid #555;background:#2c2c2c;color:#fff;font-size:1rem}.custom-link input:focus{outline:0;border-color:#07c}.custom-link button{padding:12px 16px;border-radius:8px;border:none;background:#07c;color:#fff;font-weight:500}.custom-link button:hover{background:#005fa3}.footer-text{margin-top:20px;font-size:.9rem;color:#aaa;line-height:1.4}.remember{margin-top:12px;display:flex;align-items:flex-start;gap:10px;font-size:.9rem;color:#ddd;text-align:left}.remember input{margin-top:3px;transform:scale(1.15)}@media (max-width:480px){.buttons-row{flex-direction:column}}</style><div class="container"><h1>Which webserver would you like to see?</h1><div class="buttons"><button class="neato"id="btnNeato">Neato-Brainslug</button><div class="buttons-row"><button class="esphome"data-pick="2">ESPHome v2</button> <button class="esphome"data-pick="3">ESPHome v3</button></div><div class="custom-link"><input id="customUrl"placeholder="Enter custom URL"> <button id="btnCustom">Go</button></div></div><div class="footer-text">The selected mode will only be shown until the site is reloaded (except for the custom neato brainslug interface). If you choose the remember the selected interface, you will need to clear your cookies/localStorage to get back here!</div><label class="remember"><input id="rememberChoice"type="checkbox"> <span>Remember my selection (not needed for brainslug interface)</span></label></div>';

// const urls: Record<string, string> = {
//     "2": "https://oi.esphome.io/v2/www.js",
//     "3": "https://oi.esphome.io/v3/www.js",
// };

// function resetHTML() {
//     document.head.innerHTML = '<meta charset="UTF-8"><link rel="icon" href="data:;">';
//     document.body.innerHTML = '<esp-app></esp-app>';
// }

// function loadCustomJS(js: string) {
//     resetHTML();
//     const script = document.createElement("script");
//     script.src = js;
//     document.body.appendChild(script);
// }

// async function loadNeato() {
//     resetHTML();
//     await import('./neato-entry');
// }

// function showPicker() {
// document.head.innerHTML = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';
//     document.body.innerHTML = pickerHTML;

//     // 3️⃣ Hook buttons
//     document.getElementById("btnNeato")!.addEventListener("click", () => {
//         localStorage.removeItem("pickWebserver")
//         loadNeato();
//     });

//     document.querySelectorAll(".esphome").forEach(btn => {
//         btn.addEventListener("click", () => {
//             const pick = (btn as HTMLElement).dataset.pick!;
//             const remember = (document.getElementById("rememberChoice") as HTMLInputElement)?.checked;
//             if (remember) localStorage.pickWebserver = pick;
            
//             loadCustomJS(urls[pick]);
//         });
//     });

//     document.getElementById("btnCustom")!.addEventListener("click", () => {
//         const url = (document.getElementById("customUrl") as HTMLInputElement).value;
//         if (!url) return alert("Please enter a URL");
//         const remember = (document.getElementById("rememberChoice") as HTMLInputElement)?.checked;
//         if (remember) localStorage.pickWebserver = url; // optional: store full URL
//         loadCustomJS(url);
//     });
// }


// // If nothing, load neato
// // If "0" we show picker, if "2" or "3" load those versions
// // if anything else, load that url
// if (!localStorage.pickWebserver) loadNeato();
// else if (localStorage.pickWebserver === "0") showPicker();
// else if (localStorage.pickWebserver === "2") loadCustomJS(urls["2"]);
// else if (localStorage.pickWebserver === "3") loadCustomJS(urls["3"]);
// else loadCustomJS(localStorage.pickWebserver);
