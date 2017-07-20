<template>
	<div class="safetyPage">
		<header class="headTitle">
			<h3>[安全知识]规范使用液化石油气及应急处置、逃生方法。</h3>
		</header>
		<article class="topModule module">
			<h3>液化气规范使用常识</h3>
			<ul v-for="(item, index) in commonSenseList">
				<li>{{item}}</li>
			</ul>
		</article>
		<article class="middleModule module">
			<div class="gasPic"></div>
			<div class="titleBar">
				<h4>遇到液化气泄漏事故如何进行处理：</h4>
			</div>
			<h4>遇到液化气泄漏时</h4>
			<ul>
				<li>1、要及时关闭总阀。</li>
				<li>2、打开门窗通风不得使用任何的电器设备及明火。</li>
			</ul>
		</article>
		<article class="bottomModule module">
			 <div class="titleBar">
			 	<h4>遇到因液化气泄漏发生火灾时分为下列几种状况：</h4>
			 </div>
			 <h4>一、如点着在钢瓶角阀处：</h4>
			 <ul>
				<li>1、将钢瓶移出柜中。</li>
				<li>2、用湿布盖在角阀上，将角阀关闭。</li>
			</ul>

			<h4>二、如遇火势较大时：</h4>
			 <ul>
				<li>1、尽可能用湿布背对钢瓶着火点关闭总阀。</li>
				<li>2、采用干粉灭火器进行灭火。</li>
			</ul>

			<div class="peoplePic"></div>

			 <h4>三、遇液化气泄漏，造成火灾时，在无法自救的情况下：</h4>
			 <ul>
				<li>1、迅速离开房间，到室外拨打119报警。</li>
				<li>2、在无法离开房屋时，可先到自家的阳台处，打开窗户进行自救。</li>
				<li>3、如遇烟雾较大时，可用打湿的毛巾捂住嘴，防止大量的一氧化碳吸入呼吸道致死。</li>
				<li>4、想法离开房间到室外。</li>
			</ul>
		</article>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				commonSenseList: [
					'1、按照国家有关规定配置消防设施和器材、安装可燃气浓度报警装置。',
					'2、用户要经常检查液化石油气设备是否安好无损。',
					'3、液化气灶具在使用时应有人看管，防止火被吹灭以及水、汤溢出将火浇灭。',
					'4、钢瓶位置不要靠近热源，胶管长度超过2米。同一房间内不得使用其他火源。',
					'5、使用液化石油的房间应注意通风换气。',
					'6、液化气钢瓶严禁安置在密闭的空间中。',
					'7、钢瓶必须直立使用，严禁横放或者倒放使用。',
					'8、严禁乱到残液，否则遇到明火会立即引起燃烧或爆炸。',
					'9、严禁擅自拆、修、迁改液化气管道及附件。',
					'10、胶管与调压器安全使用期为18个月，如在安全使用期内，发生胶管老化或调压器漏气的情况，应立即进行更换或维修，确保燃气使用安全。',
					'11、使用完液化气后请务必关闭钢瓶阀门！'
				]
			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
		list-style-type:none;
	}

	html,body{
		width: 100%;
		height: 100%;
	}
	button{
		padding: 10px!important;
	}
	a{color: #2fa0ec;text-decoration: none;outline: none;}
	a:hover,a:focus{color:#74777b;}

	li{list-style-type:none;}
	.safetyPage{
		width: 50%;
		height: 100%;
		padding: 10px;
		margin: 0 auto;
		overflow: auto;
		background-color: #eee;
		box-sizing: border-box;
	}
	.safetyPage .module{
		width: 100%;
		height: auto;
		padding: 20px 10px;
		margin-top: 10px;
		background-color: #fff;
		box-sizing: border-box;
	}
	.safetyPage .topModule>h3{
		margin-bottom: 10px;
		text-align: center;
		color: #226CD9;
	}
	.safetyPage .module li{
		font-size: 14px;
		padding: 5px;
	}
	/**
	 * 图片
	 */
	.safetyPage .module .gasPic{
		width: 400px;
		height: 200px;
		margin: 0 auto;
		background: url('../static/images/gas.jpg');
	}
	.safetyPage .module .peoplePic{
		width: 400px;
		height: 200px;
		margin: 0 auto;
		margin-top: 10px;
		background: url('../static/images/people.gif');
	}
	/**
	 * 公共类
	 */
	.safetyPage .module .titleBar{
		width: 100%;
		height: 35px;
		line-height: 35px;
		margin: 15px 0; 
		border-radius: 3px;
		background-color: #9AD3A8;
	}
	.safetyPage .module .titleBar>h4{
		padding-left: 10px;
		color: #fff;
	}
	.safetyPage .module>h4{
		padding-left: 10px;
		margin: 10px 0;
		color: #226CD9;
	}
	.safetyPage .module>ul{
		padding-left: 10px;
	}


</style>