import produce from 'immer';

export default {
  state: {
    data: [],
    total: 0,
    pageSize: 10,
    pageNum: 1,
    query: ''
  },

  reducers: {
    setState: (state, payload) =>
      produce(state, draft => {
        return { ...draft, ...payload };
      })
  },
  effects: {
    async query(payload, rootState) {
      const { example, routing } = rootState;
      const pathname = routing.locationBeforeTransitions.pathname;
      const { query, pageSize, pageNum } = { ...example, ...payload };

      const res = await Request({
        type: 'GET',
        url: 'url',
        data: { query, pageSize, pageNum }
      });
      this.setState({
        data: res.dataList,
        total: res.totalRecords,
        query,
        pageNum,
        pageSize
      });
    }
  }
};
