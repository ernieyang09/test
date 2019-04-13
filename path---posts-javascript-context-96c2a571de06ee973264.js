webpackJsonp([0xdd900782efb0],{471:function(n,a){n.exports={data:{site:{siteMetadata:{title:"前端小誌",author:"Ernie Yang"}},markdownRemark:{id:"/Users/ernieyang09/Desktop/workspace/gatsby-blog/src/pages/posts/2018/03/0325--javascript-context.md absPath of file >>> MarkdownRemark",html:'<snippet>\n  這邊試著整理一些javscript的context概念(教練我原本只想寫event loop啊，越寫越多orz...)\n</snippet>\n<p>先說說js function，在w3c的\b<a href="https://www.w3schools.com/js/js_function_invocation.asp">定義</a>中，呼叫一個function稱為invoke。</p>\n<p>在看js文章與執行function的時候當會看到一個字 - 執行環境(Execution Context)</p>\n<p>Execution Context就是執行javascript時候的環境(有講跟沒講一樣XD)，更準確的來說，上下文環境，確認執行時候的this, var, method...</p>\n<p>Execution Context有三種</p>\n<ol>\n<li>Gobal Execution Context - 一開始的地方，browser來說就是window</li>\n<li>Functional Execution Context - 執行function的地方</li>\n<li>Eval - 不常用</li>\n</ol>\n<p>當js invoke一個function時，會從global開始呼叫function，並且建立execution context，如果有很多function，就會一層疊一層的，此稱為execution context stack，而我們執行function的方式稱之為call stack。</p>\n<p>js建立execution context有兩個步驟</p>\n<ol>\n<li>建立階段</li>\n<li>執行階段</li>\n</ol>\n<h4>建立階段</h4>\n<ol>\n<li>建立activation object or the variable object\nvariable object指的是存放execution context scope data的物件，是一個抽象的概念，在不同的\bcontext裡面實作方式(存放的東西)是不一樣的。\n在global context中的variable object等同於自己，並且可以直接對變數引用，所以你能向下面一樣呼叫</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">\'test\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">alert</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// directly, is found in VO(globalContext): "test"</span>\n\n<span class="token function">alert</span><span class="token punctuation">(</span>window<span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// indirectly via global === VO(globalContext): "test"</span>\n<span class="token function">alert</span><span class="token punctuation">(</span>a <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></code></pre>\n      </div>\n<p>在function \bcontext中的VO稱之activation object，不能直接被引用，裡面要放入function arguments，context的var與function定義。</p>\n<ul>\n<li>\n<p>對於每一個var，js會幫AO create一個property with value undefined，如果存在property就略過。</p>\n</li>\n<li>\n<p>建立property for arg，把arguments object丟進去(reference)</p>\n</li>\n<li>\n<p>對於function，js會create一個function，然後create property by function name，然後將ref丟進去，如果存在property就覆蓋。</p>\n</li>\n<li>\n<p>建立scope chain\n想像成一個array或是list，將裡面塞入VO(包涵現在所在的) [bFunc VO, a FuncVO, Global VO]\n(es5會產生global scope, function scope，es6 let會產生block scope)</p>\n</li>\n<li>\n<p>確認this的指向。</p>\n</li>\n</ul>\n<p>最後</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">executionContextObj <span class="token operator">=</span> <span class="token punctuation">{</span>\n    scopeChain<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">/* variableObject + all parent execution context\'s variableObject */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    variableObject<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">/* function arguments / parameters, inner variable and function declarations */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token keyword">this</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// example</span>\nFuncExecutionContextObj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  activationbj<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      argumentObj <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token number">0</span><span class="token punctuation">:</span> e<span class="token punctuation">,</span>\n          length<span class="token punctuation">:</span><span class="token number">1</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      a<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span>\n      b<span class="token punctuation">:</span> undefined<span class="token punctuation">,</span>\n      c<span class="token punctuation">:</span> undefined\n      Func<span class="token punctuation">:</span> Pointer to the Function definition<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  scopeChain<span class="token punctuation">:</span> <span class="token punctuation">[</span>Func variable object<span class="token punctuation">,</span> Global exection context variable object<span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token keyword">this</span><span class="token punctuation">:</span> value <span class="token keyword">of</span> <span class="token keyword">this</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h4>執行階段</h4>\n<p>從上逐步執行每一行code，若是跑到變數宣告才會賦值。</p>\n<p>不過這樣很容易解釋</p>\n<ol>\n<li>var hoisting，因為create stage就已經知道變數了</li>\n<li>var hoisting但呼叫var時為undefined，因為實際給值的動作可能在呼叫之後</li>\n<li>function hoisting但能呼叫，因為function的處理方式是不一樣的</li>\n<li>function expression與function declaration是不一樣的，function declaration視為var 宣告，在執行階段跑到變數宣告才會create function</li>\n</ol>\n<p>寫完文章才理解大家常常在說的上下文是"context"(翻了中英對照才知道...)，實作中比較常會遇到this的指向問題，這邊並沒有多做著磨，我們應該少使用一些反模式就可以大幅減少遇到問題的可能性，像多用es6 module與arrow function就是一種好的寫法(大部份的function不用dynamic this對吧)，有一些this太刁鑽了，想要的看<a href="https://halfrost.com/javascript_this/">這裡</a>。</p>\n<h4>後記</h4>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token string">\'12\'</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">function</span> <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\na<span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// {b: ƒ}</span>\n<span class="token comment">// 12</span>\n<span class="token comment">// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}</span></code></pre>\n      </div>\n<p>\bthis的指向是跟著context的，而讀取變數是跟著scope的，上面範例，在執行d的時候，實際執行者是window，但變數是跟著scope chain所以能讀到c = 12。我發現之前我理解錯誤，我把\bcontext與execution context連想在一起，但在javascript這兩個詞應該是不一樣的(好模糊啊)，execution context是scope VO加上"context"指向的this，所以我認為d是由b執行的，所以該指向execution context的this，但execution context實際上並沒有this的值，只有確認this的綁定。以d()來說，invoke一個unbounded function，其context指向global(\bglobal.d())，而execution context把global存起來，再想到callback形式的寫法( arr.map(function(){ }) )，就能得知其實是一樣的道理。</p>\n<h4>Context vs. Scope</h4>\n<blockquote>\n<p>The first important thing to clear up is that context and scope are not the same. I have noticed many developers over the years often confuse the two terms (myself included), incorrectly describing one for the other. To be fair, the terminology has become quite muddled over the years.</p>\n</blockquote>\n<blockquote>\n<p>Every function invocation has both a scope and a context associated with it. Fundamentally, scope is function-based while context is object-based. In other words, scope pertains to the variable access of a function when it is invoked and is unique to each invocation. Context is always the value of the this keyword which is a reference to the object that “owns” the currently executing code.</p>\n</blockquote>',fields:{slug:"/posts/javascript-context/"},frontmatter:{title:"Javascript context & execution context",date:"2018-03-25T19:49",tags:["mechanic"]}}},pathContext:{slug:"/posts/javascript-context/"}}}});
//# sourceMappingURL=path---posts-javascript-context-96c2a571de06ee973264.js.map