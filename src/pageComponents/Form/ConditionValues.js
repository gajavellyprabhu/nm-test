const actions = new Map();
actions.set('show', '{AAE07A52-46A4-49EF-98B0-C2595BAC2382}');
actions.set('hide', '{7F58C8DD-D7C0-4FB7-BB44-8EC6B5E1C3D9}');
actions.set('enable', '{5744A87E-E32C-42CC-862F-96842A0202BB}');
actions.set('disable', '{C698C993-549E-486A-A09C-BB8D830DA958}');
actions.set('goToPage', '{4E448D57-BA06-42DC-9519-6BCD102CB332}');

const matchTypes = new Map();
matchTypes.set('any', '{365C94DA-C1CD-4783-A91D-0D17A16C7117}');
matchTypes.set('all', '{4E50C172-7EA6-4989-82C3-75F24F80EF72}');

const operators = new Map();
operators.set('isEqualTo', '{1D38B217-A2EE-4E7B-B6ED-13E751462FEB}');
operators.set('isNotEqualTo', '{49F47E77-E8C5-46F9-BF39-78D6B0D40B48}');
operators.set('contains', '{BF8935A6-1976-43A0-ABA5-D0BC128A76EA}');
operators.set('doesntContains', '{45AAB0FB-775B-40F5-B3B8-7CAE3ABBF643}');
operators.set('startsWith', '{FD10F291-3C2E-4AE7-8A67-2F8271CB3DF2}');
operators.set('doesntStartsWith', '{6B92597D-F2E0-47D3-A40D-59AFB37EEDE5}');
operators.set('endsWith', '{D375ED5B-E156-4A2B-9F91-DFD5B03F0D78}');
operators.set('doesntEndsWith', '{F3AC7A1A-3458-4385-BB65-860315313DB3}');
operators.set('greaterThan', '{61FF63A0-375C-47BD-9986-1F81BD12BBBB}');
operators.set('greaterThanOrEqual', '{062C6ED9-EA6E-4A88-AE54-C88E2147971D}');
operators.set('lessThan', '{8FE41E53-AD87-4D24-B50F-EA0F6BDF739F}');
operators.set('lessThanOrEqual', '{88AC1C6B-BAFE-40A7-BB75-E304C8EC29DD}');

const actionsEntries = new Map();
for (const [key, value] of actions.entries()) {
  actionsEntries.set(value, key);
}
export const actionsMap = actionsEntries;

const matchTypesEntries = new Map();
for (const [key, value] of matchTypes.entries()) {
  matchTypesEntries.set(value, key);
}
export const matchTypesMap = matchTypesEntries;

const operatorsEntries = new Map();
for (const [key, value] of operators.entries()) {
  operatorsEntries.set(value, key);
}
export const operatorsMap = operatorsEntries;

export const takeActionOnActions = (action, ref) => {
  switch (action) {
    case 'show':
      ref.classList.add('show-elem');
      break;
    case 'hide':
      ref.classList.add('hide-elem');
      break;
    case 'enable':
      ref.classList.add('enable-elem');
      break;
    case 'disable':
      ref.classList.add('disable-elem');
      break;
    case 'goToPage':
      ref.click();
      break;
    default:
      return null;
  }
};

export const takeActionOnMatchTypes = (matchType, list) => {
  switch (matchType) {
    case 'any':
      return list.some((item) => item);
    case 'all':
      return list.every((item) => item);
    default:
      return null;
  }
};

export const takeActionOnOperators = (operator, left, right) => {
  switch (operator) {
    case 'isEqualTo':
      return left === right;
    case 'isNotEqualTo':
      return left !== right;
    case 'contains':
      return left?.includes(right);
    case 'doesntContains':
      return !left?.includes(right);
    case 'startsWith':
      return left?.startsWith(right);
    case 'doesntStartsWith':
      return !left?.startsWith(right);
    case 'endsWith':
      return left?.endsWith(right);
    case 'doesntEndsWith':
      return !left?.endsWith(right);
    case 'greaterThan':
      return parseInt(left) > parseInt(right);
    case 'greaterThanOrEqual':
      return parseInt(left) >= parseInt(right);
    case 'lessThan':
      return parseInt(left) < parseInt(right);
    case 'lessThanOrEqual':
      return parseInt(left) <= parseInt(right);
    default:
      return null;
  }
};

export const handleOperator = (operator, isMet) => {
  const negateOperator = new Map();
  negateOperator.set('hide', 'show');
  negateOperator.set('show', 'hide');
  negateOperator.set('enable', 'disable');
  negateOperator.set('disable', 'enable');
  return isMet ? operator : negateOperator.get(operator);
};

export default {
  actions,
  matchTypes,
  operators,
  takeActionOnOperators,
  takeActionOnActions,
  handleOperator,
};
