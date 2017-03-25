scroll-load
====
Description: This module is used as a super simple way to the the "slide in affect" for children elements wrapped inside it.

Things to note before you use this module

1.This was a quick thing for a side project so as of currently it opens an event listener for every element wrapped inside it. You could look at performance loss if used with mass amounts. On component unmount listeners are removed.

[Example of the effect](https://css-tricks.com/slide-in-as-you-scroll-down-boxes/)

Example of usage
==
npm install scroll-load

	import scrollLoad from 'scroll-load'
	<scrollLoad>
		<img src="imgone"/>
	</scrollLoad>
	<scrollLoad>
		<img src="imgtwo"/>
	</scrollLoad>
	<scrollLoad>
		<img src="imgthree"/>
	</scrollLoad>
	
currently no params are passed in.

TODO: move to single event listener & allow css animation to be customizable to allow for different in view animations.

If you are so inclined feel free to fork and send me a pull request because it might be a minute before I get to these changes.	
