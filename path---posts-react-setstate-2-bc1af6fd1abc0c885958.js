webpackJsonp([0xe1390cbec5d6],{470:function(n,s){n.exports={data:{site:{siteMetadata:{title:"前端小誌",author:"Ernie Yang"}},markdownRemark:{id:"/Users/ernieyang09/Desktop/workspace/gatsby-blog/src/pages/posts/2018/01/0116--react-setstate-2.md absPath of file >>> MarkdownRemark",html:'<snippet>\n都2018了，現在的感覺是redux統一天下。不過在清書籤頁，希望是近期內最後一次深入了解state。\n</snippet>\n<p>因為state的改變會觸發re-render，而re-render是一個expensive的行為，所以React做了batch，在一連串state改變中只會render一次。</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    something<span class="token punctuation">:</span> thisThing<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      something<span class="token punctuation">:</span> thatThing<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>有時候就是會寫出這種code(尤其是在lifecyle componentWillReceiveProps之類的)</p>\n<p>但因為非同步所以會拿到不對的state值，所以大家很喜歡在這事上討論(打轉)。</p>\n<h4>常見解決辨法</h4>\n<ol>\n<li>\n<p>update完成後，callback，看<a href="https://ernieyang09.github.io/posts/react-setstate/">這裡</a></p>\n</li>\n<li>\n<p>校正lifecyle，在正確的lifecycle裡面呼叫setState。</p>\n</li>\n</ol>\n<p>3\b. 直接呼叫callback，介紹一下</p>\n<p>\bsetState是可以直接帶入一個callback的</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span>prevState<span class="token punctuation">,</span> currentProps<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  reurn <span class="token punctuation">{</span> prevState<span class="token punctuation">,</span> something<span class="token punctuation">:</span> currentProps<span class="token punctuation">.</span>something <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>不過這一點都不能解決非同步state問題(還是會拿到舊的state)</p>\n<p>很認真的看了<a href="https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3">文章</a>以後，我是覺得結論有點難懂</p>\n<p>，結論是說，將function移出class會讓需要修改的值變得更明確(agree)。但是仍然有小機率會用到舊的state(這邊不太理解小機率\b...)</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">incrementFooBy</span><span class="token punctuation">(</span>delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>previousState<span class="token punctuation">,</span> currentProps<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>previousState<span class="token punctuation">,</span> foo<span class="token punctuation">:</span> previousState<span class="token punctuation">.</span>foo <span class="token operator">+</span> delta <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token function">incrementFooBy</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span><span class="token operator">></span>click me<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>不過最大的變數應該是react setstate行為以後可能會全部重新定義吧。</p>\n<p>截錄另一篇<a href="http://vwangluo.com/article/detail/42214">文章</a>兩段話</p>\n<blockquote>\n<p>Honestly, the current batching strategy comes with a set of problems right now. I\'m hesitant to expand on it\'s API before we\'re sure that we\'re going to keep the current model. I think of it as a temporary escape until we figure out something better.</p>\n</blockquote>\n<p>問題的根源在於現有的 batching 策略，實話實說，這個策略帶來了一系列問題。也許這個在後期後有調整，在 batching 策略是否調整之前，盲目的擴充 setState 接口只會是一個短視的行為。</p>\n<blockquote>\n<p>In my experience, whenever I\'m tempted to use setState callback, I can achieve the same by overriding componentDidUpdate (and/or componentDidMount).</p>\n</blockquote>\n<p>對此，Redux 原作者 Dan Abramov 也發表了自己的看法。他認為，以他的經驗來看，任何需要使用 setState 第二個參數 callback 的場景，都可以使用生命周期函數 componentDidUpdate (and/or componentDidMount) 來覆寫。</p>\n<p>如果確認專案是使用redux flux等，state只用來處理一小部份short-time data，那我是覺得真正遇到問題的時候再研究啦。</p>',fields:{slug:"/posts/react-setstate-2/"},frontmatter:{title:"React的setState非同步行為2",date:"2018-01-16T10:33",tags:["react","javascript"]}}},pathContext:{slug:"/posts/react-setstate-2/"}}}});
//# sourceMappingURL=path---posts-react-setstate-2-bc1af6fd1abc0c885958.js.map