var top250 = {
    init:function(){
        this.$element = $('#top250')
        this.isLoading = false
        this.index = 0
        this.isFinish = false  //判断数据是否结束，默认情况下没有结束
        this.bind()  //踩坑点
        this.start()
    },
    bind:function(){
        //滚动事件   踩坑点
       var _this = this
       this.$element.scroll(function(){
           _this.start()
           console.log('error...')
       })
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData:function(callback){
        var _this = this
        if(_this.isLoading) return
        _this.isLoading = true   
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/top250',  
            data:{
                start:_this.index||0
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret) 
            _this.index += 20
            if(_this.index >= ret.total){
                _this.isFinish = true
            }
            callback&&callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.isLoading = false  
            _this.$element.find('.loading').hide()  
        })
    },
    render:function(data){
        var _this = this
        data.subjects.forEach(function(movie){  //遍历数组每一项生成一个dom节点后，在将生成的dom放入页面
            var template = `<div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p1910813120.jpg" alt="">
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score">9.3</span>分 / <span class="collect">1000</span>收藏</div>
                        <div class="extra"><span class="years">1994 </span> / <span class="types">/ 剧情 / 爱情 / 同性</span></div>
                        <div class="extra">导演：<span class="director">陈凯歌</span></div>
                        <div class="extra">主演：<span class="actors">张国荣、张丰毅、巩俐</span></div>
                    </div>
                </a>
            </div>`
            var $node = $(template)
            $node.find('.cover img').attr('src',movie.images.small)  //在数据库里面调用所需元素类型
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.years').text(movie.year)
            $node.find('.types').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actors').text(function(){
                var castsArr = []
                movie.casts.forEach(function(item){
                    castsArr.push(item.name)
                })
                return castsArr.join('、')
            })
             //踩坑点
            //如果成功获取数据但无法渲染到页面上，则要检查拼接字符串格式是否问题以及选择器是否写正确
            _this.$element.find('.container').append($node) 
            })
    },
    isToBottom:function(){
        return this.$element.find('.container') <= this.$element.height() + this.$element.scrollTop() + 10
    }
}

var usBox = {
    init:function(){
        console.log('usBox okay')
        this.$element = $('#usBox')
        this.start()
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData:function(callback){
        var _this = this
        if(_this.isLoading) return
        _this.isLoading = true   
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/us_box',  
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret) 
            callback&&callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()  
        })
    },
    render:function(data){
        var _this = this
        data.subjects.forEach(function(movie){ 
            movie = movie.subject
            var template = `<div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p1910813120.jpg" alt="">
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score">9.3</span>分 / <span class="collect">1000</span>收藏</div>
                        <div class="extra"><span class="years">1994 </span> / <span class="types">/ 剧情 / 爱情 / 同性</span></div>
                        <div class="extra">导演：<span class="director">陈凯歌</span></div>
                        <div class="extra">主演：<span class="actors">张国荣、张丰毅、巩俐</span></div>
                    </div>
                </a>
            </div>`
            var $node = $(template)
            $node.find('.cover img').attr('src',movie.images.small)  //在数据库里面调用所需元素类型
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.years').text(movie.year)
            $node.find('.types').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actors').text(function(){
                var castsArr = []
                movie.casts.forEach(function(item){
                    castsArr.push(item.name)
                })
                return castsArr.join('、')
            })
             //踩坑点
            //如果成功获取数据但无法渲染到页面上，则要检查拼接字符串格式是否问题以及选择器是否写正确
            _this.$element.find('.container').append($node) 
            })
        }
}

var search = {
    init:function(){
        console.log('search okay')
        this.$element = $('#search')
        this.keyword = ''
        this.bind()
        this.start()
    },
    bind:function(){
        var _this = this
        this.$element.find('.button').click(function(){
           _this.keyword = _this.$element.find('input').val()
           //启动搜索
           _this.start()
        })
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData:function(callback){
        var _this = this  
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/search',  
            data:{
                q:_this.keyword
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret) 
            callback&&callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()  
        })
    },
    render:function(data){
        var _this = this
        data.subjects.forEach(function(movie){ 
            var template = `<div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p1910813120.jpg" alt="">
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score">9.3</span>分 / <span class="collect">1000</span>收藏</div>
                        <div class="extra"><span class="years">1994 </span> / <span class="types">/ 剧情 / 爱情 / 同性</span></div>
                        <div class="extra">导演：<span class="director">陈凯歌</span></div>
                        <div class="extra">主演：<span class="actors">张国荣、张丰毅、巩俐</span></div>
                    </div>
                </a>
            </div>`
            var $node = $(template)
            $node.find('.cover img').attr('src',movie.images.small)  //在数据库里面调用所需元素类型
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.years').text(movie.year)
            $node.find('.types').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                var directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actors').text(function(){
                var castsArr = []
                movie.casts.forEach(function(item){
                    castsArr.push(item.name)
                })
                return castsArr.join('、')
            })
            _this.$element.find('.container').append($node) 
            })
        }
}

var app = {
    init:function(){
        this.$tabs = $('footer>div')
        this.$panels = $('main>section')
        this.bind()
        top250.init()
        usBox.init()
        search.init()
    },
    bind:function(){
        var _this = this
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).addClass('active').siblings().removeClass('active')
        })
    }
}
app.init()
