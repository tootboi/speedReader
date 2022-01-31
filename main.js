$(document).ready(function() {
  // variables for ok btn
  let textArray;

  // when ok btn is pressed, split textarea val into an array.
  $('#ok-btn').click(function() {
    // prevents spacebar from triggering the button
    $(this).blur();

    let textInput = $('#text-input').val();
    // replace newline with space, then split on space
    textArray = textInput.replace(/[\r\n]+/g," ").split(' ');
    index = 0;
    maxIndex = textArray.length;

    // place first array element in #text
    $('#text').text(textArray[0]);

    console.log(textArray);
  });

  // variables for reader btn
  let start = false;
  let myInterval;
  let interval = 60000 / $('#wpm').val();
  let index = 0;
  let maxIndex;

  // when reader btn is pressed, start 
  $('#reader-btn').click(function() {
    // prevents spacebar from triggering the button
    $(this).blur();

    // if ok btn not yet clicked, do nothing
    if(!textArray) return;

    // start
    if(!start) {
      startInterval();
    }
    // pause
    else {
      endInterval();
    }
  });

  // functions for interval
  function startInterval() {
    start = true;
    myInterval = setInterval(() => {
      // if element left in array, change #test
      if(index <= maxIndex) {
        index++;
        $('#text').text(textArray[index]);
      }
      // if no element left in array, stop interval
      else {
        start = false;
        clearInterval(myInterval);
      }
      console.log('test');
    }, interval);
  }

  function endInterval() {
    start = false;
    clearInterval(myInterval);
  }

  // when wpm input changed, save new interval (wpm)
  $('#wpm').on('input', function() {
    // if wpm is lower or is 0, ignore
    if($(this).val() <= 0) return;
    // calculate interval, 60 sec / wpm
    interval = 60000 / $(this).val();
    // reset interval; allows for dynamic wpm change
    endInterval();
    startInterval();
  });

  //  when space is pressed, pause/start reader
  $(window).keypress(function(e) {
    // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
    if(e.key === ' ' || e.key === 'Spacebar') {
      // if space pressed in textarea, ignore
      if($('#text-input').is(':focus')) return;

      e.preventDefault();
      if(start) {
        endInterval();
      }
      else {
        startInterval();
      }
    }
  });
});
