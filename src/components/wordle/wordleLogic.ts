export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH  = 6;

export const WORD_LIST = [
  // A
  'ACCEPT','ACCESS','ACROSS','ACTION','ACTIVE','ACTUAL','ADVICE','AFFECT',
  'AFFORD','AFRAID','AGENCY','AGENDA','ALMOST','ALWAYS','AMOUNT','ANIMAL',
  'ANNUAL','ANSWER','ANYONE','ANYWAY','APPEAL','APPEAR','AROUND','ARRIVE',
  'ARTIST','ASPECT','ASSESS','ATTACK','ATTEND','AUGUST','AUTHOR',
  // B
  'BATTLE','BEAUTY','BECOME','BEFORE','BEHAVE','BEHIND','BELIEF','BELONG',
  'BETTER','BEYOND','BORDER','BOTTLE','BOTTOM','BRANCH','BREATH','BRIDGE',
  'BRIGHT','BROKEN','BUDGET','BURDEN','BUREAU','BUTTON',
  // C
  'CAMERA','CANCER','CANNOT','CARBON','CAREER','CASTLE','CASUAL','CAUGHT',
  'CENTER','CHANCE','CHANGE','CHARGE','CHOICE','CHOOSE','CHURCH','CIRCLE',
  'CLIENT','CLOSED','COFFEE','COLUMN','COMBAT','COMEDY','COMING','COMMON',
  'COMPLY','COPPER','CORNER','COUPLE','COURSE','COUSIN','CREATE','CREDIT',
  'CRISIS','CUSTOM',
  // D
  'DAMAGE','DANGER','DEBATE','DECADE','DECIDE','DEGREE','DEMAND','DEPEND',
  'DEPUTY','DESERT','DESIGN','DESIRE','DETAIL','DETECT','DEVICE','DINNER',
  'DOCTOR','DOUBLE','DRIVER','DURING',
  // E
  'EASILY','EDITOR','EFFECT','EFFORT','EIGHTH','EITHER','EMPIRE','EMPLOY',
  'ENABLE','ENERGY','ENGAGE','ENGINE','ENOUGH','ENSURE','ENTIRE','ESCAPE',
  'ESTATE','ETHNIC','EXPAND','EXPECT','EXPERT','EXPORT','EXTEND',
  // F
  'FABRIC','FACTOR','FAILED','FAIRLY','FAMILY','FAMOUS','FATHER','FELLOW',
  'FEMALE','FIGURE','FINGER','FINISH','FISCAL','FLIGHT','FLOWER','FOLLOW',
  'FOREST','FORGET','FORMAL','FORMER','FOSTER','FOURTH','FRIEND','FUTURE',
  // G
  'GARDEN','GATHER','GENDER','GENTLE','GLOBAL','GOLDEN','GROUND','GROWTH',
  'GUILTY',
  // H
  'HANDLE','HAPPEN','HARDLY','HEALTH','HIDDEN','HOLDER','HONEST',
  // I
  'IMPACT','INCOME','INDEED','INJURY','INSIDE','ISLAND','ITSELF',
  // J
  'JUNIOR',
  // K
  'KEEPER','KILLED','KINDLY',
  // L
  'LABORS','LATEST','LATTER','LAUNCH','LAWYER','LEADER','LEAGUE','LEAVES',
  'LEGACY','LENGTH','LESSON','LETTER','LIKELY','LISTEN','LITTLE','LIVING',
  'LOCATE','LONELY','LUXURY',
  // M
  'MANAGE','MANNER','MANUAL','MARKET','MASTER','MATTER','MATURE','MEDIUM',
  'MEMBER','MEMORY','MENTAL','MERELY','METHOD','MIDDLE','MIGHTY','MIRROR',
  'MOBILE','MODERN','MODEST','MODULE','MOMENT','MONKEY','MOTHER','MOTION',
  'MURDER','MUTUAL',
  // N
  'NARROW','NATION','NATIVE','NATURE','NEARBY','NEARLY','NEEDLE','NEPHEW',
  'NICKEL','NOBODY','NORMAL','NOTICE','NOTION','NUMBER',
  // O
  'OBJECT','OBTAIN','OCCUPY','OFFICE','ONLINE','OPTION','ORANGE','ORIGIN',
  'OXYGEN',
  // P
  'PALACE','PARENT','PARTLY','PATENT','PATROL','PEANUT','PEOPLE','PERIOD',
  'PERMIT','PERSON','PHRASE','PICKUP','PICNIC','PLANET','PLENTY','POCKET',
  'POETRY','POLICE','POLICY','POLITE','POTATO','POWDER','PRETTY','PRIEST',
  'PRISON','PROFIT','PROPER','PUBLIC','PURSUE','PUZZLE',
  // R
  'RABBIT','RANDOM','RARELY','RATHER','READER','REALLY','REASON','RECALL',
  'RECENT','RECORD','REDUCE','REFORM','REFUSE','REGARD','REGION','RELATE',
  'RELIEF','REMAIN','REMOTE','REMOVE','REPAIR','REPEAT','REPORT','RESCUE',
  'RESORT','RESULT','RETAIL','RETURN','REVEAL','REVIEW','REWARD','RHYTHM',
  'ROCKET','ROUTER',
  // S
  'SAFETY','SALARY','SAMPLE','SAVING','SCHOOL','SCREEN','SCRIPT','SEARCH',
  'SEASON','SECOND','SECRET','SECTOR','SECURE','SELECT','SENIOR','SETTLE',
  'SHADOW','SHOULD','SIGNAL','SILENT','SILVER','SIMPLE','SISTER','SLIGHT',
  'SMOOTH','SOCIAL','SOURCE','SPEECH','SPIRIT','SPOKEN','SPREAD','SPRING',
  'SQUARE','STABLE','STATUS','STEADY','STOLEN','STREAM','STREET','STRICT',
  'STRIKE','STRING','STRONG','STUDIO','SUBMIT','SUDDEN','SUMMER','SUMMIT',
  'SUPPLY','SURELY','SURVEY','SWITCH','SYMBOL','SYSTEM',
  // T
  'TABLET','TALENT','TARGET','TEMPLE','TENDER','TENNIS','THANKS','THEORY',
  'THIRTY','THOUGH','TICKET','TIMING','TISSUE','TOWARD','TRAVEL','TREATY',
  // U
  'UNABLE','UNIQUE','UNITED','UNLESS','UPDATE','USEFUL',
  // V
  'VALLEY','VISION','VOLUME',
  // W
  'WANDER','WARMTH','WEAKEN','WEALTH','WEEKLY','WEIGHT','WICKED','WINDOW',
  'WINNER','WINTER','WISDOM','WONDER','WOODEN','WORKER','WRITER',
  // Y
  'YEARLY','YELLOW','YOGURT','YONDER','YOUTHS',
  // Z
  'ZANIES','ZANIER','ZAPPED','ZEALOT','ZENITH','ZEROES','ZEPHYR','ZINGER',
  'ZIRCON','ZITHER','ZLOTYS','ZODIAC','ZOMBIE','ZOOMED','ZOOMER','ZONING',
  'ZESTER','ZIPPER','ZIGZAG','ZYGOTE',
];

export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export interface TileResult {
  letter: string;
  state: TileState;
}

export function evaluateGuess(guess: string, target: string): TileResult[] {
  const result: TileResult[] = Array(WORD_LENGTH).fill(null).map((_, i) => ({
    letter: guess[i],
    state: 'absent' as TileState,
  }));

  const targetConsumed = Array(WORD_LENGTH).fill(false);
  const guessConsumed  = Array(WORD_LENGTH).fill(false);

  // Pass 1: mark greens
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      result[i].state = 'correct';
      targetConsumed[i] = true;
      guessConsumed[i]  = true;
    }
  }

  // Pass 2: mark yellows
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessConsumed[i]) continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (targetConsumed[j]) continue;
      if (guess[i] === target[j]) {
        result[i].state = 'present';
        targetConsumed[j] = true;
        break;
      }
    }
  }

  return result;
}

export function getKeyboardState(
  results: TileResult[][]
): Record<string, TileState> {
  const priority: Record<TileState, number> = {
    correct: 3,
    present: 2,
    absent:  1,
    tbd:     0,
    empty:   0,
  };

  const state: Record<string, TileState> = {};

  for (const row of results) {
    for (const tile of row) {
      const current = state[tile.letter];
      if (!current || priority[tile.state] > priority[current]) {
        state[tile.letter] = tile.state;
      }
    }
  }

  return state;
}

export function checkWin(result: TileResult[]): boolean {
  return result.every(t => t.state === 'correct');
}
