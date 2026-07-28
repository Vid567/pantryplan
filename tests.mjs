import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = fs.readFileSync("pantryplan-app.html", "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, "The app must contain one inline script");
assert.match(html, /aria-live="polite"/);
assert.match(html, /🥫<small>to pantry<\/small>/);
assert.match(html, /Tap a product name/);
assert.match(html, /Open the next entry screen/);
assert.match(html, /Speak clearly and firmly/);
assert.match(html, /Android may transcribe "two pound steak"/);
assert.match(html, /\.btn-primary \{ background: var\(--green\)/);
assert.match(html, /Move safely to a new phone/);
assert.match(html, /The same backup works between iPhone and Android/);
assert.match(html, /PantryPlan-GUIDE\.html/);
assert.match(html, /rec\.maxAlternatives = 5/);
assert.match(html, /"x":"eggs"/);
assert.match(html, /"erwten":"peas"/);
new Function(script);

const stateCode = script.slice(
  script.indexOf("const CATS"),
  script.indexOf("// ───────── Tabs")
);
const context = {
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: () => {},
  toast: () => {},
  render: () => {}
};
vm.createContext(context);
vm.runInContext(stateCode, context);
const evaluate = expression => vm.runInContext(expression, context);

assert.equal(
  evaluate(`normalizeState({
    pantry:[{name:"Rice",qty:2,cat:"Invalid",photo:"javascript:alert(1)"}],
    shop:[]
  },true).pantry[0].cat`),
  "Other"
);
assert.equal(
  evaluate(`normalizeState({
    data:{pantry:[],shop:[{name:"Milk",qty:0}]}
  },true).shop[0].qty`),
  1
);
assert.throws(() => evaluate("normalizeState({},true)"));

const manifest = JSON.parse(fs.readFileSync("manifest.webmanifest", "utf8"));
assert.equal(manifest.start_url, "./pantryplan-app.html");
new Function(fs.readFileSync("service-worker.js", "utf8"));
for(const asset of [
  "index.html",
  "pantryplan-app.html",
  "PantryPlan-GUIDE.html",
  "manifest.webmanifest",
  "icon.svg"
]){
  assert.ok(fs.existsSync(asset), `Missing cached asset: ${asset}`);
}

console.log("PantryPlan syntax, import validation and PWA asset tests passed.");
