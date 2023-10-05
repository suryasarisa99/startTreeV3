const apps = {
  youtube: "https://www.youtube.com/",
  Gmail: "https://mail.google.com/mail/u/0/#inbox",
  drive: "https://drive.google.com/drive/my-drive",
  whatsapp: "https://web.whatsapp.com/",
  telegram: "https://web.telegram.org/a/",
};
const ai = {
  "chat-gpt": "https://chat.openai.com/",
  bard: "https://bard.google.com/",
  bing: "https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx",
};

const dev = {
  mongodb: "https://cloud.mongodb.com/v2/6429821c6213b94599ed4e9b#/clusters",
  github: "https://github.com/suryasarisa99?tab=repositories",
  vercel: "https://vercel.com/dashboard",
  render: "https://dashboard.render.com/",
  netlify: "https://app.netlify.com/teams/suryasarisa99/sites",
  firebase: "",
};

const appDev = {
  "jetpack compose":
    "https://developer.android.com/jetpack/compose/documentation",
  Android: "https://developer.android.com/reference/android/widget/TextView",
  Material: "https://m3.material.io/",
};

const tree1 = {
  name: "Utils",
  branches: [
    { type: "links", name: "Apps", data: apps },
    { type: "links", name: "Ai", data: ai },
  ],
};
const tree2 = {
  name: "AppDev",
  branches: [
    { type: "links", name: "Dev", data: dev },
    { type: "links", name: "appDev", data: appDev },
  ],
};

const js = {
  MdN: "https://developer.mozilla.org/en-US/docs/Web/JavaScript#reference",
  w3schools: "https://www.w3schools.com/js/default.asp",
};

const mongodb = {
  mongodb: "https://www.mongodb.com/docs/manual/reference/operator/query/",
  w3schools: "https://www.w3schools.com/mongodb/",
};

const kali = {
  "kali docs": "https://www.kali.org/docs/",
  "kali linux": "https://www.kali.org/",
  "kali netHunter": "https://www.kali.org/kali-nethunter/",
  "Google hacking Db": "https://www.exploit-db.com/google-hacking-database",
  "kali tools": "https://www.kali.org/tools/",
  offsec: "https://www.offsec.com/",
  "exploit db": "https://www.exploit-db.com/",
  "kali forms": "https://forums.kali.org/",
};
const tree3 = {
  name: "Program",
  branches: [
    {
      name: "Web",
      type: "subtree",
      branches: [
        { name: "js", type: "links", data: js },
        { name: "mongodb", type: "links", data: mongodb },
      ],
    },
    {
      name: "other",
      type: "subtree",
      branches: [
        { name: "python", type: "links", data: js },
        { name: "mongodb", type: "links", data: mongodb },
      ],
    },
  ],
};

const tree4 = {
  name: "kali",
  branches: [
    {
      name: "kali-linux",
      type: "links",
      data: kali,
    },
  ],
};
export const trees = [tree1, tree2, tree3, tree4];
