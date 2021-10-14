import { init } from 'snabbdom/build/init'
import { h } from 'snabbdom/build/h'
import { htmlDomApi } from "snabbdom/build/htmldomapi";
import { attributesModule } from 'snabbdom/build/modules/attributes'
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners'
import movieList from './movieList.json'

const patch = init([attributesModule, eventListenersModule], htmlDomApi);

let oldVnode = null
function view() {
  let vnode = null;
  let head =  h('div', { attrs: { style: 'display:flex;' } },[
    h('div', { attrs: { style: 'margin-right:10px' } }, '排序:'),
    h('button', {
      attrs: { style: 'margin-right:50px;cursor:pointer'}, on: {
      click: function () {
        movieList.sort(function (a, b) {
          return (b.id - a.id)
        });
        //操作了排序需要diff
        vnode = view();
        oldVnode = patch(oldVnode, vnode)
      }}}, '降序'),
    h('Button', {on: {
      click: function () {
        movieList.push({
          "id":5,
          "title": "巴啦啦小魔仙",
          "desc":'balallllll'
        })
        //新增了Dom需要diff
        vnode = view();
        oldVnode = patch(oldVnode, vnode)
      },
    }},'add')
  ])

  let list = [];
  movieList.forEach((item,index)  => {
    let li = h('div',{ key: item.id, attrs: { style: 'display:flex;' } },
      [ h('p', { attrs: { style: 'margin-right:10px' } }, item.id),
        h('p', item.title),
        h('p', { attrs: { style: 'width:400px;margin:10px 40px;' } }, item.desc),
        h('button', {attrs: { style: 'height:30px;margin-top:40px;cursor:pointer;' }, on: {
          click: function () {
            movieList.splice(index, 1)
            //删除了Dom需要diff
            vnode = view();//拿到新的Vnode
            oldVnode = patch(oldVnode, vnode)
        }}
      }, '删除')])
    list.push(li)
  })
  vnode = h('div', [head, h('div', list)])
  return vnode;
}

//首次diff
let app = document.querySelector('#app')
oldVnode = patch(app, view())


