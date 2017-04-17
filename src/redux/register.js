const TYPE = {
  ADD_REGISTER_DATA: 'ADD_REGISTER_DATA'
};

export let addRegisterData = (data, status) => ({
  type: TYPE.ADD_REGISTER_DATA,
  data,
  status
});

const initialState = {
  data: null,
  status: false
};

export default (_state = initialState, action = {}) => {
  let state = {..._state};
  switch (action.type) {
    case TYPE.ADD_REGISTER_DATA:
      return {
        ...state,
        status: action.status,
        data: action.data
      };
    default:
      return state;
  }
};
