import { useState } from "react";

const TOPICS = [
  {id:"cell",label:"Cell Structure & Function",ch:"9-11",tier:1},
  {id:"photo",label:"Photosynthesis & Respiration",ch:"12-13",tier:1},
  {id:"class",label:"Biological Classification",ch:"4",tier:1},
  {id:"bact",label:"Bacteria & Viruses",ch:"17-18",tier:1},
  {id:"body",label:"Body Systems Overview",ch:"36-38",tier:1},
  {id:"nerv",label:"Nervous & Endocrine Systems",ch:"39",tier:1},
  {id:"circ",label:"Circulatory & Respiratory",ch:"40",tier:1},
  {id:"dige",label:"Digestive & Immune Systems",ch:"41-42",tier:1},
  {id:"gene",label:"Genetics & Heredity",ch:"44",tier:1},
  {id:"dna",label:"DNA & RNA",ch:"45",tier:1},
  {id:"evol",label:"Evolution & Natural Selection",ch:"47-48",tier:1},
  {id:"eco",label:"Ecosystems & Food Webs",ch:"49-50",tier:1},
  {id:"anim",label:"Animal Kingdom & Vertebrates",ch:"30-35",tier:2},
  {id:"plant",label:"Plants & Photosynthesis",ch:"25-29",tier:2},
  {id:"fungi",label:"Fungi & Protists",ch:"20-23",tier:2},
  {id:"repro",label:"Reproduction & Development",ch:"43",tier:2},
];

const CLUE_STYLES = {
  superpower: { border:"2px solid #7F77DD", background:"#EEEDFE", label:"(+) Superpower — 6 pts", labelColor:"#534AB7" },
  power:      { border:"2px solid #378ADD", background:"#E6F1FB", label:"(*) Power — 5 pts",      labelColor:"#185FA5" },
  normal:     { border:"2px solid #1D9E75", background:"#E1F5EE", label:"Normal — 4 pts",          labelColor:"#0F6E56" },
  giveaway:   { border:"2px solid #ccc",    background:"#f5f5f5", label:"Giveaway — 3 pts",         labelColor:"#888" },
};

function QuestionCard({ q, idx, clueLevel, showAnswer, result, onClue, onToggleAnswer, onMark, isMiss, mastered, onMaster, onRemove }) {
  const clueKeys = ["superpower","power","normal","giveaway"];
  const nextClueLabel = ["Read superpower clue","Read power clue","Read normal clue","Read giveaway clue"];

  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"0.75rem", borderTop: isMiss ? "3px solid #E24B4A" : mastered ? "3px solid #1D9E75" : "3px solid #378ADD", opacity: mastered ? 0.55 : 1 }}>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontSize:11, color:"#888", fontFamily:"monospace" }}>#{idx+1}</span>
        <span style={{ fontSize:11, background:"#E1F5EE", color:"#085041", border:"1px solid #5DCAA5", padding:"2px 8px", borderRadius:20, fontWeight:500 }}>{q.topic}</span>
        <span style={{ fontSize:10, fontFamily:"monospace", padding:"2px 7px", borderRadius:20, background: q.difficulty==="easy"?"#EAF3DE":q.difficulty==="medium"?"#E6F1FB":"#EEEDFE", color: q.difficulty==="easy"?"#27500A":q.difficulty==="medium"?"#0C447C":"#3C3489", border:"1px solid "+(q.difficulty==="easy"?"#97C459":q.difficulty==="medium"?"#85B7EB":"#AFA9EC") }}>{q.difficulty}</span>
        {isMiss && !mastered && <span style={{ fontSize:10, fontFamily:"monospace", padding:"2px 7px", borderRadius:20, background:"#FCEBEB", color:"#791F1F", border:"1px solid #F09595" }}>needs work</span>}
        {mastered && <span style={{ fontSize:10, fontFamily:"monospace", padding:"2px 7px", borderRadius:20, background:"#EAF3DE", color:"#27500A", border:"1px solid #97C459" }}>mastered</span>}
        {!isMiss && result==="correct" && <span style={{ fontSize:10, color:"#1D9E75", fontFamily:"monospace" }}>correct</span>}
        {!isMiss && result==="incorrect" && <span style={{ fontSize:10, color:"#E24B4A", fontFamily:"monospace" }}>missed</span>}
      </div>

      {clueKeys.slice(0, clueLevel).map(k => (
        <div key={k} style={{ borderLeft: CLUE_STYLES[k].border, background: CLUE_STYLES[k].background, padding:"0.5rem 0.875rem", marginBottom:6, borderRadius:"0 6px 6px 0", fontSize:13, lineHeight:1.6 }}>
          <div style={{ fontSize:9, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.1em", color: CLUE_STYLES[k].labelColor, marginBottom:3 }}>{CLUE_STYLES[k].label}</div>
          {q.clues[k]}
        </div>
      ))}

      {clueLevel === 0 && <div style={{ fontSize:12, color:"#aaa", fontFamily:"monospace", padding:"4px 0" }}>Read clues one at a time — stop when Advith buzzes in</div>}

      <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
        {clueLevel < 4 && (
          <button onClick={() => onClue(clueLevel + 1)} style={{ fontSize:11, padding:"5px 11px", borderRadius:6, border:"1px solid #ccc", background:"#f9f9f9", cursor:"pointer", fontFamily:"monospace", color: clueLevel===0?"#534AB7":clueLevel===1?"#185FA5":clueLevel===2?"#0F6E56":"#888" }}>
            {nextClueLabel[clueLevel]}
          </button>
        )}
      </div>

      {clueLevel > 0 && (
        <div style={{ marginTop:"0.875rem", paddingTop:"0.875rem", borderTop:"1px solid #e5e7eb" }}>
          <button onClick={onToggleAnswer} style={{ fontSize:11, padding:"5px 11px", borderRadius:6, border:"1px solid #ddd", background:"#f5f5f5", cursor:"pointer", fontFamily:"monospace", marginBottom:8 }}>
            {showAnswer ? "Hide answer" : "Reveal answer"}
          </button>
          {showAnswer && (
            <div>
              <div style={{ fontSize:9, color:"#aaa", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>Answer</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"1.4rem", color:"#1D9E75", marginBottom:4 }}>{q.answer}</div>
              <div style={{ fontSize:12, color:"#666", lineHeight:1.5 }}>{q.note}</div>
            </div>
          )}
          {isMiss && !mastered && (
            <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
              <button onClick={onMaster} style={{ fontSize:12, padding:"6px 13px", borderRadius:8, border:"1px solid #97C459", background:"#EAF3DE", color:"#27500A", cursor:"pointer", fontWeight:500 }}>Got it this time</button>
              <button onClick={onRemove} style={{ fontSize:12, padding:"6px 13px", borderRadius:8, border:"1px solid #ddd", background:"#f9f9f9", color:"#888", cursor:"pointer" }}>Remove</button>
            </div>
          )}
          {!isMiss && !result && (
            <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
              <button onClick={() => onMark("correct")} style={{ fontSize:12, padding:"7px 14px", borderRadius:8, border:"1px solid #97C459", background:"#EAF3DE", color:"#27500A", cursor:"pointer", fontWeight:500 }}>Got it</button>
              <button onClick={() => onMark("incorrect")} style={{ fontSize:12, padding:"7px 14px", borderRadius:8, border:"1px solid #F09595", background:"#FCEBEB", color:"#791F1F", cursor:"pointer", fontWeight:500 }}>Missed</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("quiz");
  const [selTopics, setSelTopics] = useState(new Set(TOPICS.filter(t=>t.tier===1).map(t=>t.id)));
  const [questions, setQuestions] = useState([]);
  const [clueStates, setClueStates] = useState({});
  const [answerShown, setAnswerShown] = useState({});
  const [results, setResults] = useState({});
  const [misses, setMisses] = useState([]);
  const [missCS, setMissCS] = useState({});
  const [missAS, setMissAS] = useState({});
  const [scores, setScores] = useState({ c: 0, m: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("10");
  const [filter, setFilter] = useState("all");

  const toggleTopic = (id) => {
    const next = new Set(selTopics);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelTopics(next);
  };

  const generate = async () => {
    if (loading || selTopics.size === 0) { if(selTopics.size===0) alert("Select at least one topic."); return; }
    setLoading(true);
    const topicList = TOPICS.filter(t => selTopics.has(t.id)).map(t => t.label).join(", ");
    const usedAnswers = questions.map(q => q.answer);
    const avoidClause = usedAnswers.length > 0
      ? `\n\nCRITICAL: Do NOT use any of these answers that have already been asked: ${usedAnswers.join(", ")}. You must pick completely different answers.`
      : "";
    const prompt = `You are an IAC Biology Bee question writer for 4th grade students. Generate exactly ${count} pyramid-style questions where HARDEST most technical clues come FIRST and EASIEST giveaway clue comes LAST. Topics: ${topicList}. Return ONLY a JSON array, no markdown. Each item: {"topic":"string","answer":"string","note":"one sentence why","difficulty":"easy|medium|hard","clues":{"superpower":"very technical 1-2 sentences","power":"moderate 1-2 sentences","normal":"recognizable 1-2 sentences","giveaway":"easiest 1 sentence"}}. Vary answers widely — organelles, scientists, diseases, processes, classifications, body systems, genetics. No repeated answers within this batch.${avoidClause}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4000, messages:[{role:"user",content:prompt}] }) });
      const data = await res.json();
      let txt = data.content.filter(b=>b.type==="text").map(b=>b.text).join("");
      txt = txt.replace(/```json|```/g,"").trim();
      const newQs = JSON.parse(txt);
      setQuestions(prev => [...prev, ...newQs]);
      setClueStates({}); setAnswerShown({}); setResults({});
    } catch(e) { alert("Error: " + e.message); }
    setLoading(false);
  };

  const markQ = (i, result) => {
    if (results[i]) return;
    setResults(prev => ({...prev, [i]: result}));
    if (result === "correct") {
      setScores(prev => ({...prev, c: prev.c+1, total: prev.total+1}));
    } else {
      setScores(prev => ({...prev, m: prev.m+1, total: prev.total+1}));
      setMisses(prev => [...prev, { q: questions[i], mastered: false }]);
      setMissCS(prev => ({...prev, [misses.length]: 0}));
      setMissAS(prev => ({...prev, [misses.length]: false}));
    }
  };

  const markMastered = (i) => setMisses(prev => prev.map((m,j) => j===i ? {...m, mastered:true} : m));
  const removeMiss = (i) => {
    setMisses(prev => prev.filter((_,j) => j!==i));
    setMissCS(prev => { const n={};Object.entries(prev).forEach(([k,v])=>{const ki=parseInt(k);if(ki<i)n[ki]=v;else if(ki>i)n[ki-1]=v;});return n;});
    setMissAS(prev => { const n={};Object.entries(prev).forEach(([k,v])=>{const ki=parseInt(k);if(ki<i)n[ki]=v;else if(ki>i)n[ki-1]=v;});return n;});
  };
  const clearMastered = () => setMisses(prev => prev.filter(m => !m.mastered));
  const redrill = () => { setMissCS({}); setMissAS({}); setFilter("needs"); };

  const unmastered = misses.filter(m => !m.mastered).length;
  const mastered = misses.filter(m => m.mastered).length;
  const acc = scores.total > 0 ? Math.round(scores.c / scores.total * 100) : null;
  const answered = Object.keys(results).length;

  let filteredMisses = misses.map((m,i)=>({m,i}));
  if (filter==="needs") filteredMisses = filteredMisses.filter(({m})=>!m.mastered);
  if (filter==="mastered") filteredMisses = filteredMisses.filter(({m})=>m.mastered);

  const byTopic = {};
  filteredMisses.forEach(({m,i})=>{ if(!byTopic[m.q.topic]) byTopic[m.q.topic]=[]; byTopic[m.q.topic].push({m,i}); });

  const TabBtn = ({id, label}) => (
    <button onClick={()=>setActiveTab(id)} style={{ flex:1, padding:"8px 12px", borderRadius:8, border: activeTab===id?"1px solid #ddd":"none", background: activeTab===id?"#fff":"transparent", color: activeTab===id?"#111":"#888", fontFamily:"inherit", fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
      {label}
      {id==="miss" && unmastered > 0 && <span style={{ background:"#E24B4A", color:"#fff", fontSize:10, fontWeight:500, padding:"1px 5px", borderRadius:10, minWidth:16 }}>{unmastered}</span>}
    </button>
  );

  return (
    <div style={{ fontFamily:"system-ui, sans-serif", maxWidth:700, margin:"0 auto", padding:"1rem" }}>
      <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
        <div style={{ display:"inline-block", fontSize:11, fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase", color:"#1D9E75", border:"1px solid #5DCAA5", padding:"3px 12px", borderRadius:20, marginBottom:8 }}>IAC Biology Bee Trainer</div>
        <div style={{ fontSize:22, fontWeight:500, color:"#111", marginBottom:2 }}>Advith's Biology Quiz</div>
        <div style={{ fontSize:13, color:"#888" }}>Pyramid-style · Hardest clues first · May 18 Biology Bee</div>
      </div>

      <div style={{ display:"flex", gap:3, background:"#f5f5f5", border:"1px solid #e5e7eb", borderRadius:10, padding:3, marginBottom:"1rem" }}>
        <TabBtn id="quiz" label="Quiz" />
        <TabBtn id="miss" label="Miss List" />
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:"1rem", flexWrap:"wrap" }}>
        {[{n:scores.c,l:"correct",c:"#1D9E75"},{n:scores.m,l:"missed",c:"#E24B4A"},{n:scores.total,l:"total",c:"#111"},{n:acc!==null?acc+"%":"—",l:"accuracy",c:"#378ADD"}].map(({n,l,c})=>(
          <div key={l} style={{ flex:1, minWidth:70, background:"#f9f9f9", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px" }}>
            <div style={{ fontSize:18, fontWeight:500, color:c }}>{n}</div>
            <div style={{ fontSize:11, color:"#888", marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ height:2, background:"#e5e7eb", borderRadius:2, marginBottom:"1rem", overflow:"hidden" }}>
        <div style={{ height:"100%", background:"#378ADD", width: questions.length>0?Math.round(answered/questions.length*100)+"%":"0%", transition:"width .4s" }} />
      </div>

      {activeTab === "quiz" && (
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, color:"#aaa", fontFamily:"monospace" }}>TOPICS</span>
            <button onClick={()=>setSelTopics(new Set(TOPICS.map(t=>t.id)))} style={{ fontSize:11, padding:"3px 9px", borderRadius:5, border:"1px solid #ddd", background:"#f9f9f9", cursor:"pointer" }}>All</button>
            <button onClick={()=>setSelTopics(new Set())} style={{ fontSize:11, padding:"3px 9px", borderRadius:5, border:"1px solid #ddd", background:"#f9f9f9", cursor:"pointer" }}>None</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:5, marginBottom:"1rem" }}>
            {TOPICS.map(t => (
              <button key={t.id} onClick={()=>toggleTopic(t.id)} style={{ background: selTopics.has(t.id)?"#E1F5EE":"#fff", border: `1px solid ${selTopics.has(t.id)?"#5DCAA5":"#e5e7eb"}`, borderRadius:8, padding:"7px 10px", cursor:"pointer", textAlign:"left", fontSize:12, color: selTopics.has(t.id)?"#085041":"#333", lineHeight:1.4, transition:"all .15s" }}>
                <span style={{ fontSize:9, color:selTopics.has(t.id)?"#5DCAA5":"#aaa", display:"block", fontFamily:"monospace", marginBottom:1 }}>Ch.{t.ch} · Tier {t.tier}</span>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", fontSize:11, color:"#888", fontFamily:"monospace", marginBottom:"1rem" }}>
            {[["#7F77DD","(+) superpower 6pts"],["#378ADD","(*) power 5pts"],["#1D9E75","normal 4pts"],["#ccc","after 3pts"]].map(([c,l])=>(
              <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:10, height:3, borderRadius:2, background:c }} />{l}</div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:"1rem", flexWrap:"wrap" }}>
            <button onClick={generate} disabled={loading} style={{ background: loading?"#ccc":"#1D9E75", color:"#fff", border:"none", padding:"9px 18px", borderRadius:8, fontFamily:"inherit", fontSize:13, fontWeight:500, cursor: loading?"not-allowed":"pointer" }}>
              {loading ? "Generating..." : questions.length===0 ? "Generate questions" : "Generate more questions"}
            </button>
            <select value={count} onChange={e=>setCount(e.target.value)} style={{ fontSize:13, padding:"8px 10px", borderRadius:8, border:"1px solid #ddd" }}>
              <option value="5">5 questions</option>
              <option value="10">10 questions</option>
              <option value="15">15 questions</option>
            </select>
            {questions.length > 0 && <span style={{ fontSize:11, color:"#aaa", fontFamily:"monospace" }}>{answered} of {questions.length} answered</span>}
          </div>
          {loading && <div style={{ textAlign:"center", padding:"2rem", color:"#888", fontSize:13 }}>Generating questions — takes about 10 seconds...</div>}
          {!loading && questions.length === 0 && <div style={{ textAlign:"center", padding:"2rem", color:"#aaa", fontSize:13 }}>Select topics above and click Generate to begin.</div>}
          {!loading && questions.map((q,i) => (
            <QuestionCard key={i} q={q} idx={i}
              clueLevel={clueStates[i]||0}
              showAnswer={answerShown[i]||false}
              result={results[i]||null}
              onClue={l=>setClueStates(prev=>({...prev,[i]:l}))}
              onToggleAnswer={()=>setAnswerShown(prev=>({...prev,[i]:!prev[i]}))}
              onMark={r=>markQ(i,r)}
              isMiss={false} mastered={false}
            />
          ))}
        </div>
      )}

      {activeTab === "miss" && (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:"1rem", flexWrap:"wrap" }}>
            {[{n:misses.length,l:"total missed"},{n:mastered,l:"mastered",c:"#1D9E75"},{n:unmastered,l:"needs work",c:"#E24B4A"}].map(({n,l,c})=>(
              <div key={l} style={{ flex:1, minWidth:80, background:"#f9f9f9", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px" }}>
                <div style={{ fontSize:18, fontWeight:500, color:c||"#111" }}>{n}</div>
                <div style={{ fontSize:11, color:"#888", marginTop:1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:"1rem", flexWrap:"wrap" }}>
            <button onClick={redrill} disabled={unmastered===0} style={{ background: unmastered>0?"#E24B4A":"#f0f0f0", color: unmastered>0?"#fff":"#aaa", border:"none", padding:"8px 16px", borderRadius:8, fontFamily:"inherit", fontSize:12, fontWeight:500, cursor: unmastered>0?"pointer":"not-allowed" }}>Re-drill missed</button>
            <button onClick={clearMastered} style={{ background:"#f9f9f9", border:"1px solid #ddd", color:"#666", padding:"8px 14px", borderRadius:8, fontFamily:"inherit", fontSize:12, cursor:"pointer" }}>Clear mastered</button>
          </div>
          <div style={{ display:"flex", gap:6, marginBottom:"0.875rem", flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ fontSize:11, color:"#aaa", fontFamily:"monospace" }}>FILTER</span>
            {["all","needs","mastered"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{ fontSize:11, padding:"4px 10px", borderRadius:20, border:"1px solid "+(filter===f?"#F09595":"#ddd"), background: filter===f?"#FCEBEB":"#f9f9f9", color: filter===f?"#791F1F":"#888", cursor:"pointer", fontFamily:"monospace" }}>{f==="all"?"All":f==="needs"?"Needs work":"Mastered"}</button>
            ))}
          </div>
          {misses.length === 0
            ? <div style={{ textAlign:"center", padding:"2rem", color:"#aaa", fontSize:13 }}>No missed questions yet — they appear here automatically.</div>
            : filteredMisses.length === 0
              ? <div style={{ textAlign:"center", padding:"1rem", color:"#aaa", fontSize:13 }}>No questions match this filter.</div>
              : Object.entries(byTopic).map(([topic,grp])=>{
                  const nw=grp.filter(({m})=>!m.mastered).length;
                  return (
                    <div key={topic} style={{ marginBottom:"1.25rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:500, color:"#888", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", padding:"5px 0", borderBottom:"1px solid #e5e7eb", marginBottom:8 }}>
                        <span>{topic}</span>
                        <span style={{ color:nw>0?"#E24B4A":"#1D9E75" }}>{nw>0?nw+" need work":"all mastered"}</span>
                      </div>
                      {grp.map(({m,i})=>(
                        <QuestionCard key={i} q={m.q} idx={i}
                          clueLevel={missCS[i]||0}
                          showAnswer={missAS[i]||false}
                          result={null}
                          onClue={l=>setMissCS(prev=>({...prev,[i]:l}))}
                          onToggleAnswer={()=>setMissAS(prev=>({...prev,[i]:!prev[i]}))}
                          onMark={()=>{}}
                          isMiss={true} mastered={m.mastered}
                          onMaster={()=>markMastered(i)}
                          onRemove={()=>removeMiss(i)}
                        />
                      ))}
                    </div>
                  );
                })
          }
        </div>
      )}
    </div>
  );
}
