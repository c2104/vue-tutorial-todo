// Vue.Draggable ライブラリを取り込む
const draggable = window['vuedraggable'];

// Vue インスタンスを作成
new Vue({
    // Vueアプリケーションとして認識させる要素を指定する（マウントする）
    el: '#app',

    // Vueインスタンスで利用するデータオブジェクトを定義する
    data: {
        inputTodo : '',         // Todoを入力する<input>のデータ（文字列）
        todos : [],             // Todoリストの<ul>データ（配列）
        doraggableOptions : {   // Todoの並べ替えに関する設定
            animation: 300,          // 並べ替えのアニメーションを300msに設定（1秒 = 1000ms）
            handle: '.sort-handle',  // 並べ替えでドラッグをできる要素を指定
        }
    },

    // Vueアプリケーションで利用可能な要素を作成する
    components: {
        'draggable' : draggable,    // <draggable>タグ : Vue.Draggableライブラリを利用
    },

    // 自作のディレクティブを登録する
    // ディレクティブ : テンプレートに記述できる`v-`から始まる属性のこと。様々なディレクティブが存在し、属性値に応じたDOM操作ができる。
    directives: {
        // `v-focus`というカスタムディレクティブを登録
        // ページ読み込み時にTodoを入力するテキストボックスにフォーカスを当てる
        focus: {
            // `v-focus`をひも付けてている要素が DOM に挿入される時
            inserted(el) {
                el.focus();     // 要素にフォーカスを当てる
            }
        }
    },

    // イベント発生時に実行する処理を定義する
    methods: {
        // 入力したTodoを追加する
        addTodo() {
            // テキストボックスが空白の場合
            if (this.inputTodo == "") {
                this.forcusInputTodo();     // テキストボックスにフォーカスを当てる
                return;                     // 処理を終了
            }

            // todosの配列に入力されたTodoを追加する
            this.todos.push({
                name : this.inputTodo,      // todos配列のnameに入力されたTodoを
            });

            this.inputTodo = '';        // テキストボックスの中身をクリアする
            this.forcusInputTodo();     // テキストボックスにフォーカスを当てる
        },

        // 指定したTodoを削除する
        // 引数:
        //   index : Todoリスト内のTodoの番号
        deleteTodo(index) {
            // todos内の{index}番から1つ目（つまり{index}番）のTodoを取り除く
            this.todos.splice(index, 1)
        },

        // Todoを入力するテキストボックスにフォーカスを当てるメソッド
        forcusInputTodo() {
            // refs="inputTodo" を指定した要素にフォーカスを当てる
            this.$refs.inputTodo.focus();
        }
    }
});