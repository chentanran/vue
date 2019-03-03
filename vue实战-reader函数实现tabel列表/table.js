Vue.component('vTable', {
  props: {
    columns: {
      type: Array,
      default: function(){ return [] }
    },
    data: {
      type: Array,
      default: function() { return [] }
    }
  },

  data() {
    return {
      currentColumns: [], // 获取列表头数据
      currentData: [], // 获取列表数据
    }
  },

  methods: {
    // 给 currentColumns 赋值
    markCurrentColumns() {
      this.currentColumns = this.columns.map((row, index) => {
        row._sortType = "normal";
        row._index = index;
        return row;
      })

      console.log(this.currentColumns);
    },
    // 给 currentData 赋值
    makeCurrentData() {
      this.currentData = this.data.map((row, index) => {
        row._index = index;
        return row;
      })

      console.log(this.currentData);
    },

    // 升序排列
    handleSortableByAsc(index) {
      let key = this.currentColumns[index].key;

      for(let i = 0; i < this.currentColumns.length; i++) {
        this.currentColumns._sortType = 'normal';
      }
      this.currentColumns[index]._sortType = 'asc';

      this.currentData.sort(function(a, b){
        return a[key] > b[key] ? 1 : -1;
      })

    },
    // 降序排列
    handleSortableByDesc(index) {
      let key = this.currentColumns[index].key;

      for(let i = 0; i < this.currentColumns.length; i++) {
        this.currentColumns[i]._sortType = "normal";
      }
      this.currentColumns[index]._sortType = "desc";

      this.currentData.sort(function(a,b){
        return a[key] < b[key] ? 1 : -1;
      })
    }
  },

  mounted() {
    this.markCurrentColumns();
    this.makeCurrentData();
  },

  watch: {
    data: function() {
      this.makeCurrentData();

      let sortData = this.currentColumns.filter(item => {
        if(item._sortType !== 'normal') {
          return item;
        }
      })

      if(sortData.length > 0) {
        if(sortData[0]._sortType == 'asc'){
          this.handleSortableByAsc(sortData[0]._index)
        } else if (sortData[0]._sortType === 'desc') {
          this.handleSortableByDesc(sortData[0]._index);
        }
      }
    }
  },

  render: function(h) {
   
      var ths = [];

      this.currentColumns.forEach((row, index) => {
        if(row.sortable) {
          ths.push(h('th', [
            h('span', row.title),
            // 升序
            h('a', {
              on: {
                click: () => {
                  this.handleSortableByAsc(index)
                }
              }
            }, '↑'),
            // 降序
            h('a', {
              on: {
                click: () => {
                  this.handleSortableByDesc(index);
                }
              }
            }, '↓')
          ]))
        } else {
          ths.push(h('th', row.title))
        }
      })

      var trs = [];

      this.currentData.forEach((row)=>{
        var tds = [];
        this.currentColumns.forEach(cell => {
          tds.push(h('td', row[cell.key]))
        })
        trs.push(h('tr', tds))
      })
   
     return h('table', [
       h('thead', [
         h('tr', ths)
       ]),

       h('tbody', trs)
     ])   
    
  }
})