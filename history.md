1.0.0 - 1.0.5 / 2022-03-20
===================
* Initial release
* pre-changelog

2.0.5 / 2022-03-20
===================
* mostly identical to 1.0.5, but converted so that the simple function is split from the normal/advanced function
* breaking, due to splitting Array+Object type modes into different function
    - the reason for this was that there was no way to precicely determine whether or not the first argument passed to ```st.check``` or ```st.checkSync``` was an array of multiple acceptable types, or an array containing multiple required types/type-arrays
    - ```st.checkSimple``` and ```st.checkSimpleSync```, will now replace the functionality of the old ```st.check``` and ```st.checkSync``` respectively...
    - ```st.check``` and ```st.checkSync``` will now only accept 2 arguments, for the Array and Object type input modes

* adding more tests for increased stability
* adding this history.md file to track changes
* intending for v2 to be a long term version, as this was a choice to make a very early breaking change...

2.0.6 / 2022-03-20
===================
* update and correct readme
* add tests for readme examples