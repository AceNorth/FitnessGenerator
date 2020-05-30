import React, { useState } from 'react';
import { generateNextOptions } from './generators/nextOptionsGenerator';
import { generateCombatEncounter } from './generators/combatEncounterGenerator';
import { generateNonCombatEncounter } from './generators/nonCombatEncounterGenerator';
import { doesThisThingHappenWithRerolls } from './generators/utils.js';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Slider,
  Typography,
} from '@material-ui/core';

const styles = {
  container: {
    marginTop: 20,
    display: 'flex',
    flex: 1,
  },
};

function App() {

  const [missionStage, setMissionStage] = useState(1);
  const [nextOptionsText, setNextOptionsText] = useState('');

  const generateNextOptionsText = () => {
    setNextOptionsText(generateNextOptions(missionStage));
  };

  const [chanceThisThingHappens, setChanceThisThingHappens] = useState(50);
  const [rerollsChanceThisThingHappens, setRerollsChanceThisThingHappens] = useState(0);
  const [doesThisThingHappenText, setDoesThisThingHappenText] = useState('');

  const generateDoesThisThingHappenText = () => {
    setDoesThisThingHappenText(doesThisThingHappenWithRerolls(chanceThisThingHappens, rerollsChanceThisThingHappens));
  };

  const [rerollsForCombatDifficulty, setRerollsForCombatDifficulty] = useState(0);
  const [rerollsForCombatToughness, setRerollsForCombatToughness] = useState(0);
  const [combatEncounterText, setCombatEncounterText] = useState('');

  const generateCombatEncounterText = () => {
    setCombatEncounterText(generateCombatEncounter(rerollsForCombatDifficulty, rerollsForCombatToughness));
  };

  const [rerollsForNonCombatDifficulty, setRerollsForNonCombatDifficulty] = useState(0);
  const [nonCombatEncounterText, setNonCombatEncounterText] = useState('');

  const generateNonCombatEncounterText = () => {
    setNonCombatEncounterText(generateNonCombatEncounter(rerollsForNonCombatDifficulty));
  };

  return (
    <div style={styles.container}>
      <Grid container justify="center" alignItems="space-around" spacing={2}>
        <Grid item xs={5}>
          <Card style={styles.card}>
            <CardHeader title="Generate next options!" />
            <CardContent>
              <div>
                Mission Stage
                <div>
                  <Slider
                    defaultValue={rerollsForCombatDifficulty}
                    step={1}
                    marks
                    min={1}
                    max={3}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => setMissionStage(val)}
                  />
                </div>
              </div>
              <div>
                <Button variant="outlined" color="primary" type="button" onClick={generateNextOptionsText}>Generate!</Button>
              </div>
              <div>
                <textarea readOnly rows={4} cols={40} value={nextOptionsText} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card style={styles.card}>
            <CardHeader title="Does this thing happen?" />
            <CardContent>
              <Typography gutterBottom>
                Percent chance
              </Typography>
              <Slider
                defaultValue={chanceThisThingHappens}
                step={10}
                marks
                min={10}
                max={100}
                valueLabelDisplay="auto"
                onChange={(e, val) => setChanceThisThingHappens(val)}
              />
              <Typography gutterBottom>
                Rerolls
              </Typography>
              <Slider
                defaultValue={rerollsChanceThisThingHappens}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e, val) => setRerollsChanceThisThingHappens(val)}
              />
              <div>
                <Button variant="outlined" color="primary" type="button" onClick={generateDoesThisThingHappenText}>Well does it?</Button>
              </div>
              <div>
                <textarea readOnly rows={6} cols={40} value={doesThisThingHappenText} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card style={styles.card}>
            <CardHeader title="Generate a combat encounter!" />
            <CardContent>
              <Typography gutterBottom>
                Difficulty rerolls
              </Typography>
              <Slider
                defaultValue={rerollsForCombatDifficulty}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e, val) => setRerollsForCombatDifficulty(val)}
              />
              <Typography gutterBottom>
                Toughness rerolls
              </Typography>
              <Slider
                defaultValue={rerollsForCombatToughness}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e, val) => setRerollsForCombatToughness(val)}
              />
              <div>
                <Button variant="outlined" color="primary" type="button" onClick={generateCombatEncounterText}>Generate an encounter!</Button>
              </div>
              <div>
                <textarea readOnly rows={3} cols={40} value={combatEncounterText} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card style={styles.card}>
            <CardHeader title="Generate a noncombat encounter!" />
            <CardContent>
              <Typography gutterBottom>
                Difficulty rerolls
              </Typography>
              <Slider
                defaultValue={rerollsForNonCombatDifficulty}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onChange={(e, val) => setRerollsForNonCombatDifficulty(val)}
              />
              <div>
                <Button variant="outlined" color="primary" type="button" onClick={generateNonCombatEncounterText}>Generate!</Button>
              </div>
              <div>
                <textarea readOnly rows={4} cols={40} value={nonCombatEncounterText} />
              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </div>
  );
}

export default App;
