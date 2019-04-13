webpackJsonp([0x9f64524fcc7],{476:function(n,s){n.exports={data:{site:{siteMetadata:{title:"前端小誌",author:"Ernie Yang"}},markdownRemark:{id:"/Users/ernieyang09/Desktop/workspace/gatsby-blog/src/pages/posts/2019/03/0330--python-for-loop.md absPath of file >>> MarkdownRemark",html:'<p>range 直接回傳list</p>\n<p>range(start, stop[, step]) 到stop結束，但不包含stop</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">length <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#假設是5</span>\n\n<span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span>\n<span class="token comment"># [0,1,2,3,4]</span>\n\n<span class="token comment"># 反過來就要</span>\n<span class="token builtin">range</span><span class="token punctuation">(</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token comment"># [4,3,2,1,0]</span></code></pre>\n      </div>\n<p>xrange是generator</p>\n<p>一次只回傳一個</p>\n<p>for loop的話xrange會比range效能好，因為xrange不用allocate array</p>\n<p>目前python3的range就是python2的xrange</p>\n<p>如果要return list就要</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">xrange</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>實測python2</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">python -m timeit <span class="token string">\'for i in range(1000000):\'</span> <span class="token string">\' pass\'</span>\n<span class="token comment"># 10 loops, best of 3: 18.5 msec per loop</span>\npython -m timeit <span class="token string">\'for i in xrange(1000000):\'</span> <span class="token string">\' pass\'</span>\n<span class="token comment"># 100 loops, best of 3: 11.1 msec per loop</span></code></pre>\n      </div>\n<p>但在python3</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">python -m timeit <span class="token string">\'for i in range(1000000):\'</span> <span class="token string">\' pass\'</span>\n<span class="token comment"># 10 loops, best of 3: 24.1 msec per loop</span></code></pre>\n      </div>\n<p>這就跟complier有關了</p>\n<p>另外python3 range跟enumerate比較，range速度快一點，大概是因為enumerate有key跟value</p>\n<p>但是如果是同時要idx value還是enumerate快點?</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">test <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token comment"># only take value</span>\n<span class="token comment"># 2.674504293128848</span>\n<span class="token keyword">for</span> i <span class="token keyword">in</span> test<span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>\n\n<span class="token comment"># get idx and value</span>\n<span class="token comment"># 6.778496273094788</span>\n<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n<span class="token comment"># get key</span>\n<span class="token comment"># 3.3357064370065928</span>\n<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>\n\n<span class="token comment"># get idx and value</span>\n<span class="token comment"># 5.7636028518900275</span>\n<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> enumreate<span class="token punctuation">(</span>test<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>刷leetcode的時候，重要的是complexity，剩下的是減少判斷</p>\n<p>至於while比for loop慢請看<a href="https://stackoverflow.com/questions/869229/why-is-looping-over-range-in-python-faster-than-using-a-while-loop">這</a></p>',fields:{slug:"/posts/python-for-loop/"},frontmatter:{title:"python for loop比較",date:"2019-03-30T11:53",tags:["python"]}}},pathContext:{slug:"/posts/python-for-loop/"}}}});
//# sourceMappingURL=path---posts-python-for-loop-abf80bfb45ef49129aad.js.map