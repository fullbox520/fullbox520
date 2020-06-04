var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [
            {
                id: '',
                title: '6:00 起床',
                completed: false
            }
        ],
        cacheTodo: {},
        cacheTitle: "",
        visibility: 'all'
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo.trim();
            var timestamp = Math.floor(Date.now());
            if (!value) {
                return
            }
            this.todos.push({
                id: timestamp,
                title: value,
                computed: false,

            });
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            var newIndex = '';
            var vm = this;
            vm.todos.forEach(function (item, key) {
                if (todo.id === item.id) {
                    newIndex = key
                }
            })
            this.todos.splice(newIndex, 1)
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo = {}
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle
            this.cacheTitle = '';
            this.cacheTodo = {};
        },
        clearTodos: function () {
            this.todos = [];
        }
    },
    computed: {
        filteredTodos: function () {
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'active') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            } else if (this.visibility == 'completed') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            }
            return [];
        },

        undoneTodo: function () {
            var totalUndoneTodo = [];
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    totalUndoneTodo.push(item)
                }
            })
            return totalUndoneTodo.length
        }
    }
});