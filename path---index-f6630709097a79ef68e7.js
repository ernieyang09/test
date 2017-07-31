webpackJsonp([5],{"./node_modules/json-loader/index.js!./.cache/json/index.json":function(n,s){n.exports={data:{allMarkdownRemark:{edges:[{node:{fields:{slug:"/dont-release-zalgo/"},frontmatter:{title:"Don't release Zalgo!!",date:"2017-08-01T01:30",tags:["promise","javascript","async"]},html:'<p><snippet></snippet></p>\n<p><a href="https://oren.github.io/blog/zalgo.html">Don\'t release Zalgo!!!!!</a>\n同場加映<a href="http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony">Designing APIs for Asynchrony</a></p>\n<p>最主要的一句話</p>\n<blockquote>\n<p>make sure your function always sync or always async.</p>\n</blockquote>\n<p>其實最近看書才知道這個詞，不過以前使用jQuery的時候就有設計過相似的概念。</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> df <span class="token operator">=</span> $<span class="token punctuation">.</span><span class="token function">Deffered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>model<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      df<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>model<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">async</span><span class="token operator">...</span>\n    <span class="token keyword">return</span> df<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>當時的想法也很簡單，我寫了一個getData function有時候直接可以取得，有時候需要非同步很麻煩，乾脆直接包起來就好了，這樣出去以後可以統一.then()多方便，寫著寫著就成習慣了。</p>\n<p>最近買了小黃書才知道原來這是個好寫法(寫得好)，當然其中還有很多原因，還包括了promise的一些特性，書裡面推崇的是es6的promise，jQuery版本的可能只有make sure your function always sync or always async這個概念。</p>\n<p>等有空一點再來介紹。</p>\n<p>PS.目前專案是與fetch寫在一起，但我總覺得哪裡還需要改進，譬如說不需要resolve(false)，而是component connect state去判斷是否有成功，對於async await還有try catch的部分還不熟，之後要多爬文囉。</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment" spellcheck="true">// redux with thunk</span>\n<span class="token punctuation">(</span>data<span class="token punctuation">,</span> url<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>dispatch<span class="token punctuation">,</span> getState<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>\n  <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'done\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n        <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">//塞資料進入store</span>\n        <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'done\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n        <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>'}},{node:{fields:{slug:"/fetch-in-react-life-cycle/"},frontmatter:{title:"在React life cyle中做async",date:"2017-07-30T21:15",tags:["react","redux","javascript","前端"]},html:'<snippet>\n最近需要幫網站加入權限的機制，到底該怎們將權限加入React中\n</snippet>\n<p>由於公司是走oauth2.0，oauth2.0的官網在SPA推薦的是implicit flow，在npm也可以找到此部分的套件，但這不是這篇文章的重點，重點在於接完之後，該如何進行下一步驗證。</p>\n<p>通常SPA要驗證一定會有一個flag或一組key，來做後續的動作，當然server端一定也要驗證，不然我前台亂輸入flag與key，資料就全部被弄出來了，以oauth來說我們就必須將accessToken當作前台的一個驗證。</p>\n<p>這邊我的作法如下</p>\n<p>確認是否有token -> request api取得個人資訊 -> 有了才登入 沒有就是假token</p>\n<p>所以我們可以在首次render SPA的時候(也就是使用者第一次點開你的網頁的時候)進行request api的行為。</p>\n<p>那到底要放在componentWillMount還是componentDidMount呢</p>\n<h3>componentWillMount</h3>\n<p>在Component Render之前就會執行，但是fetch資料屬於非同步，render並不會等待，此時還拿不到init state，有可能會出錯，必須自己在constructor先init state，<a href="https://daveceddia.com/watch-out-for-undefined-state/">詳情見此</a>，會render多次。</p>\n<h3>componentDidMount</h3>\n<p>就跟上面做了個對比，是比較建議放入ajax的地方，也會render多次。</p>\n<p>不過剛好最近出了v0.16，依照這篇<a href="https://www.reddit.com/r/reactjs/comments/5fg7iq/why_should_ajax_requests_go_in_componentdidmount/">文章</a>來看，componentWillMount似乎是個好選擇(我還沒有驗證)</p>\n<p>若是與redux連接，可以在provider的那層(通常是app)，componentWillMount的時候執行store.dispatch(fn)，似乎也蠻符合SPA的開發方式，有一些preload可以放在此處，不過實際上接的時候還是會遇到一些問題，之後再討論囉。</p>'}},{node:{fields:{slug:"/react-setstate/"},frontmatter:{title:"React的setState非同步行為",date:"2017-07-28T20:00",tags:["react","javascript","前端"]},html:'<snippet>\n其實我想很多人都知道React的setState是非同步的行為，但是通常還是會順順地使用它，直到他真的發生了奇妙的事情以後，才會開始認真思考這個問題。\n</snippet>\n<p>沒錯，那個認真思考問題的人就是我。在專案裡面的登入頁面中，被埋了sleep 1秒的code，前人告訴我那是為了他debug方便而寫的，當我把這行code拿掉的時候，怎麼登都無法登入，這時候我臉上都冒出三條線了...</p>\n<p>一定很多人都看過React的官方文件</p>\n<blockquote>\n<p>setState() does not immediately mutate this.state but creates a pending state transition. Accessing this.state after calling this method can potentially return the existing value. There is no guarantee of synchronous operation of calls to setState and calls may be batched for performance gains.</p>\n</blockquote>\n<p>在react的github上也很多人再討論是否要加入promise的<a href="https://github.com/facebook/react/issues/2642">功能</a>，因為開發者說明performance issues就不提供了。</p>\n<p>不過其實setState提供了callback方法。(很顯然大家不喜歡寫callback)</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> callback<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>整理以後可以寫成下方的這種形式，就可以接者await使用</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">extends</span> Component <span class="token punctuation">{</span>\n    setStateAsync <span class="token operator">=</span> state <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> resolve<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>這樣我要來解我的登入BUG了..</p>'}},{node:{fields:{slug:"/first-post/"},frontmatter:{title:"使用gatsby做自己的blog",date:"2017-07-26T22:06",tags:["blog"]},html:"<snippet>\n測試一下\n</snippet>\n<p>其實沒什麼要說的</p>\n<p>晚點再補</p>"}}]}},pathContext:{}}}});
//# sourceMappingURL=path---index-f6630709097a79ef68e7.js.map