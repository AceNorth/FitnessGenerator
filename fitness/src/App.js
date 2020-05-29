import React, { useState } from 'react';
import { generateNextOptions } from './generators/nextOptionsGenerator';
import { generateCombatEncounter } from './generators/combatEncounterGenerator';
import { generateNonCombatEncounter } from './generators/nonCombatEncounterGenerator';
import { doesThisThingHappenWithRerolls } from './generators/utils.js'

const styles = {
  card: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
};

function App() {

  const [missionStage, setMissionStage] = useState(null);
  const [nextOptionsText, setNextOptionsText] = useState('');

  const generateNextOptionsText = () => {
    setNextOptionsText(generateNextOptions(missionStage));
  };

  const [chanceThisThingHappens, setChanceThisThingHappens] = useState(null);
  const [rerollsChanceThisThingHappens, setRerollsChanceThisThingHappens] = useState(null);
  const [doesThisThingHappenText, setDoesThisThingHappenText] = useState('');

  const generateDoesThisThingHappenText = () => {
    setDoesThisThingHappenText(doesThisThingHappenWithRerolls(chanceThisThingHappens, rerollsChanceThisThingHappens));
  };

  const [rerollsForCombatDifficulty, setRerollsForCombatDifficulty] = useState(null);
  const [rerollsForCombatToughness, setRerollsForCombatToughness] = useState(null);
  const [combatEncounterText, setCombatEncounterText] = useState('');

  const generateCombatEncounterText = () => {
    setCombatEncounterText(generateCombatEncounter(rerollsForCombatDifficulty, rerollsForCombatToughness));
  };

  const [rerollsForNonCombatDifficulty, setRerollsForNonCombatDifficulty] = useState(null);
  const [nonCombatEncounterText, setNonCombatEncounterText] = useState('');

  const generateNonCombatEncounterText = () => {
    setNonCombatEncounterText(generateNonCombatEncounter(rerollsForNonCombatDifficulty));
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.card}>
          <b>
            Generate next options!
          </b>
          <div>
            <input placeholder="Mission stage" type="text"
              name="nextOptions" size="30" onChange={e => setMissionStage(Number(e.target.value))} />
          </div>
          <div>
            <button type="button" onClick={generateNextOptionsText}>Generate!</button>
          </div>
          <div>
            <textarea readOnly rows={4} cols={40} value={nextOptionsText} />
          </div>
        </div>

        <div style={styles.card}>
          <b>
            Does this thing happen??
          </b>
          <div>
            <input placeholder="Percent chance" type="text"
              name="chanceThisThingHappens" size="10" onChange={e => setChanceThisThingHappens(Number(e.target.value))} />
          </div>
          <div>
            <input placeholder="Rerolls" type="text"
              name="rerollsChanceThisThingHappens" size="10" onChange={e => setRerollsChanceThisThingHappens(Number(e.target.value))} />
          </div>
          <div>
            <button type="button" onClick={generateDoesThisThingHappenText}>Well does it?</button>
          </div>
          <div>
            <textarea readOnly rows={6} cols={40} value={doesThisThingHappenText} />
          </div>
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.card}>
          <b>
            Generate a combat encounter!
          </b>
          <div>
            <input placeholder="Diff rerolls" type="text"
              name="rerollsForCombatDifficulty" size="20" onChange={e => setRerollsForCombatDifficulty(Number(e.target.value))} />
          </div>
          <div>
            <input placeholder="Toughness rerolls" type="text"
              name="rerollsForCombatToughness" size="20" onChange={e => setRerollsForCombatToughness(Number(e.target.value))} />
          </div>
          <div>
            <button type="button" onClick={generateCombatEncounterText}>Generate an encounter!</button>
          </div>
          <div>
            <textarea readOnly rows={3} cols={40} value={combatEncounterText} />
          </div>
        </div>

        <div style={styles.card}>
          <b>
            Generate a noncombat encounter!
          </b>
          <div>
            <input placeholder="Diff rerolls" type="text"
              name="rerollsForNonCombatDifficulty" size="30" onChange={e => setRerollsForNonCombatDifficulty(Number(e.target.value))} />
          </div>
          <div>
            <button type="button" onClick={generateNonCombatEncounterText}>Generate!</button>
          </div>
          <div>
            <textarea readOnly rows={4} cols={40} value={nonCombatEncounterText} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
