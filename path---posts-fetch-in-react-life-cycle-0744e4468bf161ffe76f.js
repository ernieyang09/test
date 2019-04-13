webpackJsonp([69682375033117],{468:function(e,t){e.exports={data:{site:{siteMetadata:{title:"前端小誌",author:"Ernie Yang"}},markdownRemark:{id:"/Users/ernieyang09/Desktop/workspace/gatsby-blog/src/pages/posts/2017/07/0730--fetch-in-react-life-cycle.md absPath of file >>> MarkdownRemark",html:'<snippet>\n最近需要幫網站加入權限的機制，到底該怎們將權限加入React中\n</snippet>\n<p>由於公司是走oauth2.0，oauth2.0的官網在SPA推薦的是implicit flow，在npm也可以找到此部分的套件，但這不是這篇文章的重點，重點在於接完之後，該如何進行下一步驗證。</p>\n<p>通常SPA要驗證一定會有一個flag或一組key，來做後續的動作，當然server端一定也要驗證，不然我前台亂輸入flag與key，資料就全部被弄出來了，以oauth來說我們就必須將accessToken當作前台的一個驗證。</p>\n<p>這邊我的作法如下</p>\n<p>確認是否有token -> request api取得個人資訊 -> 有了才登入 沒有就是假token</p>\n<p>所以我們可以在首次render SPA的時候(也就是使用者第一次點開你的網頁的時候)進行request api的行為。</p>\n<p>那到底要放在componentWillMount還是componentDidMount呢</p>\n<h3>componentWillMount</h3>\n<p>在Component Render之前就會執行，但是fetch資料屬於非同步，render並不會等待，此時還拿不到init state，有可能會出錯，必須自己在constructor先init state，<a href="https://daveceddia.com/watch-out-for-undefined-state/">詳情見此</a>，會render多次。</p>\n<h3>componentDidMount</h3>\n<p>就跟上面做了個對比，是比較建議放入ajax的地方，也會render多次。</p>\n<p>不過剛好最近出了v0.16，依照這篇<a href="https://www.reddit.com/r/reactjs/comments/5fg7iq/why_should_ajax_requests_go_in_componentdidmount/">文章</a>來看，componentWillMount似乎是個好選擇(我還沒有驗證)</p>\n<p>若是與redux連接，可以在provider的那層(通常是app)，componentWillMount的時候執行store.dispatch(fn)，似乎也蠻符合SPA的開發方式，有一些preload可以放在此處，不過實際上接的時候還是會遇到一些問題，之後再討論囉。</p>',fields:{slug:"/posts/fetch-in-react-life-cycle/"},frontmatter:{title:"在React life cyle中做async",date:"2017-07-30T21:15",tags:["react","javascript"]}}},pathContext:{slug:"/posts/fetch-in-react-life-cycle/"}}}});
//# sourceMappingURL=path---posts-fetch-in-react-life-cycle-0744e4468bf161ffe76f.js.map