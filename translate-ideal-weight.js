const fs = require('fs');
const path = require('path');

const filePath = path.join(process.env.HOME, 'Desktop/kalcufy/src/app/[locale]/ideal-weight-calculator/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Title & Subtitle
  ['>Ideal Weight Calculator</h1>', '>{t("calculator.title", "Ideal Weight Calculator")}</h1>'],
  ['<p className="text-slate-600 mt-1">Calculate your ideal body weight using 5 scientific formulas</p>', '<p className="text-slate-600 mt-1">{t("calculator.subtitle", "Calculate your ideal body weight using 5 scientific formulas")}</p>'],
  
  // Breadcrumb
  ['>Home</Link>', '>{t("common.home", "Home")}</Link>'],
  ['>Calculators</Link>', '>{t("common.calculators", "Calculators")}</Link>'],
  
  // Your Information
  ['>Your Information</h2>', '>{t("calculator.yourInformation", "Your Information")}</h2>'],
  
  // Age
  ['className="font-medium text-slate-700">Age</span>', 'className="font-medium text-slate-700">{t("inputs.age", "Age")}</span>'],
  ['>years</span>', '>{t("inputs.years", "years")}</span>'],
  
  // Height
  ['>Height</label>', '>{t("inputs.height", "Height")}</label>'],
  ['>ft</span>', '>{t("inputs.feet", "ft")}</span>'],
  ['>in</span>', '>{t("inputs.inches", "in")}</span>'],
  
  // Current Weight
  ['>Current Weight</label>', '>{t("inputs.currentWeight", "Current Weight")}</label>'],
  
  // Unit buttons
  ['{unit === "imperial" ? "Imperial (lb, in)" : "Metric (kg, cm)"}', '{unit === "imperial" ? t("inputs.imperial", "Imperial (lb, in)") : t("inputs.metric", "Metric (kg, cm)")}'],
  
  // Gender buttons  
  ['>Male</button>', '>{t("inputs.male", "Male")}</button>'],
  ['>Female</button>', '>{t("inputs.female", "Female")}</button>'],
  
  // Results - ideal weight
  ['>Your Ideal Weight (Average)</p>', '>{t("results.idealWeight", "Your Ideal Weight (Average)")}</p>'],
  ['>Ideal Weight</p>', '>{t("results.idealWeight", "Ideal Weight")}</p>'],
  
  // Results - healthy range
  ['>Healthy Range:', '>{t("results.healthyRange", "Healthy Range")}:'],
  
  // Results - weight status (ternary operators)
  ['? "Weight to Lose"', '? t("results.weightToLose", "Weight to Lose")'],
  ['? "Weight to Gain"', '? t("results.weightToGain", "Weight to Gain")'],
  [': "At Ideal Weight!"', ': t("results.atIdealWeight", "At Ideal Weight!")'],
  
  // Results - timeline
  ['>Timeline</p>', '>{t("results.timeline", "Timeline")}</p>'],
  
  // Visualizations
  ['>Healthy Weight Range</h3>', '>{t("visualizations.healthyWeightRange", "Healthy Weight Range")}</h3>'],
  ['>Current:', '>{t("visualizations.current", "Current")}:'],
  ['>Ideal:', '>{t("visualizations.ideal", "Ideal")}:'],
  ['>Healthy Zone</span>', '>{t("visualizations.healthyZone", "Healthy Zone")}</span>'],
  ['>Formula Comparison</h3>', '>{t("visualizations.formulaComparison", "Formula Comparison")}</h3>'],
  
  // Advanced
  ['>Advanced Options</span>', '>{t("advanced.title", "Advanced Options")}</span>'],
  ['>Wrist Circumference (for frame size)</label>', '>{t("inputs.wristCircumference", "Wrist Circumference")}</label>'],
  ['>Or select frame size manually</label>', '>{t("frameSize.selectManually", "Or select frame size manually")}</label>'],
  ['>Weight Change Rate</label>', '>{t("advanced.weightChangeRate", "Weight Change Rate")}</label>'],
  ['lb/week</span>', '{t("advanced.lbWeek", "lb/week")}</span>'],
  
  // Frame size buttons
  ['>Small</button>', '>{t("frameSizes.small", "Small")}</button>'],
  ['>Medium</button>', '>{t("frameSizes.medium", "Medium")}</button>'],
  ['>Large</button>', '>{t("frameSizes.large", "Large")}</button>'],
  ['>Detected frame:', '>{t("frameSize.detected", "Detected frame")}:'],
  
  // Buttons
  ['>💾 Save</>', '>💾 {t("buttons.save", "Save")}</>'],
  ['>⏳ Saving...</>', '>⏳ {t("buttons.saving", "Saving...")}</>'],
  ['>✅ Saved!</>', '>✅ {t("buttons.saved", "Saved!")}</>'],
  
  // Education section
  ['>What is Ideal Body Weight?</h2>', '>{t("education.whatIsIdealWeight", "What is Ideal Body Weight?")}</h2>'],
  ['>Why Do Formulas Give Different Results?</h2>', '>{t("education.whyDifferent", "Why Do Formulas Give Different Results?")}</h2>'],
  ['>About the Formulas</h3>', '>{t("aboutFormulas.title", "About the Formulas")}</h3>'],
  ['>Important Considerations</h3>', '>{t("considerations.title", "Important Considerations")}</h3>'],
  
  // Frame size table
  ['>Frame Size Reference</h3>', '>{t("frameSize.title", "Frame Size Reference")}</h3>'],
  ['>Frame</th>', '>{t("frameSize.frame", "Frame")}</th>'],
  ['>Men (wrist)</th>', '>{t("frameSize.men", "Men (wrist)")}</th>'],
  ['>Women (wrist)</th>', '>{t("frameSize.women", "Women (wrist)")}</th>'],
  ['>Adjust</th>', '>{t("frameSize.adjust", "Adjust")}</th>'],
  ['>Small</td>', '>{t("frameSizes.small", "Small")}</td>'],
  ['>Medium</td>', '>{t("frameSizes.medium", "Medium")}</td>'],
  ['>Large</td>', '>{t("frameSizes.large", "Large")}</td>'],
  
  // Sources  
  ['>Sources & References</h2>', '>{t("sources.title", "Sources & References")}</h2>'],
];

let count = 0;
for (const [search, replace] of replacements) {
  if (content.includes(search)) {
    content = content.split(search).join(replace);
    count++;
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Traducciones aplicadas:', count);
