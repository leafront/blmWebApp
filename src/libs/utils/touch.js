var touch = function () {
    this.clientX = 0;
    this.clientY = 0;
    this.downX   = 0;
    this.downY   = 0;
    this.upX     = 0;
    this.upY     = 0;
    this.distance    = 0;
    this.directionX  = "";
    this.directionY  = "";
    this.slideXCount = 0;
    this.slideYCount = 0;
    this.slideMode   = "";
    this.moveStep    = 0;

    this.minSlideDistance  = 50;

    this.mousemoveCallback = null;
    this.mouseupCallback   = null;
    this.mousedownCallback = null;

    this.opt = {
      mode: {
        horizontal: 'horizontal',
        vertical  : 'vertical'
      },
      direction: {
        up   : 'up',
        down : 'down',
        left : 'left',
        right: 'right'
      }
    }
    var t = this;
    this.mouseMoveHandler = function (e) {
        t.getMousePosition(e.clientX, e.clientY);
        //e.preventDefault();
    }
    this.mouseDownHandler = function (e) {
        t.getMouseDownPosition(e.clientX, e.clientY);
        t.bindDocumentMouseEvent();
        //e.preventDefault();
    }
    this.mouseUpHandler = function (e) {
        t.getMouseUpPosition(e.clientX, e.clientY);
        t.eventRecycle();
        //e.preventDefault();
    }
    this.touchMoveHandler = function (e) {
        t.getMousePosition(e.touches[0].clientX, e.touches[0].clientY);
        //e.preventDefault();
    }
    this.touchStartHandler = function (e) {
        t.getMouseDownPosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        t.bindDocumentMouseEvent();
        //e.preventDefault();
    }
    this.touchEndHandler = function (e) {
        t.getMouseUpPosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        t.eventRecycle();
        //e.preventDefault();
    }
}
touch.prototype = {
    reset: function () {
        this.clientX = 0;
        this.clientY = 0;
        this.downX = 0;
        this.downY = 0;
        this.upX = 0;
        this.upY = 0;
        this.distance = 0;
        this.directionX = "";
        this.directionY = "";
        this.slideXCount = 0;
        this.slideYCount = 0;
        this.minSlideDistance = 50;
        this.slideMode = "";
        //        this.mousemoveCallback = null;
        //        this.mouseupCallback = null;
        //        this.mousedownCallback = null;
    },
    eventRecycle: function () {
        this.unbindDocumentMouseEvent();
        this.reset();
    },
    //判断
    isHorizontal: function() {
      return this.slideMode == this.opt.mode.horizontal;
    },
    isVertical: function() {
      return this.slideMode == this.opt.mode.vertical;
    },
    isRight: function() {
      return this.directionX == this.opt.direction.right;
    },
    isLeft: function() {
      return this.directionX == this.opt.direction.left;
    },
    isUp: function() {
      return this.directionY == this.opt.direction.up;
    },
    isDown: function() {
      return this.directionY == this.opt.direction.down;
    },
    checkMoveDirection: function (x, y) {
      if (y < this.clientY && this.directionY != this.opt.direction.up) {
          this.slideYCount++
          this.directionY = this.opt.direction.up;
      } else if (y > this.clientY && this.directionY != this.opt.direction.down) {
          this.slideYCount++
          this.directionY = this.opt.direction.down;
      }

      if (x < this.clientX && this.directionX != this.opt.direction.left) {
          this.slideXCount++;
          this.directionX = this.opt.direction.left;
      } else if (x > this.clientX && this.directionX != this.opt.direction.right) {
          this.slideXCount++;
          this.directionX = this.opt.direction.right;
      }
    },
    checkSlideMode: function () {
        let distanceX = Math.abs(this.upX - this.downX);
        let distanceY = Math.abs(this.upY - this.downY);
        if (distanceX < this.minSlideDistance &&
            distanceY < this.minSlideDistance) {
            return;
        }
        if (distanceX > distanceY) {
            this.distance = distanceX
            this.slideMode = this.opt.mode.horizontal; //水平
        } else {
            this.distance = distanceY
            this.slideMode = this.opt.mode.vertical; //垂直
        }
    },
    getMousePosition: function (x, y) {
        this.checkMoveDirection(x, y);
        this.clientX = x;
        this.clientY = y;
        //scrollTop
        if (typeof this.mousemoveCallback == "function") {
          this.mousemoveCallback(this);
        }
    },
    getMouseDownPosition: function (x, y) {
        this.downX = x;
        this.downY = y;
        this.clientX = x;
        this.clientY = y;
        if (typeof this.mousedownCallback == "function") {
          this.mousedownCallback(this);
        }
    },
    getMouseUpPosition: function (x, y) {
        this.upX = x;
        this.upY = y;
        this.checkSlideMode();
        if (typeof this.mouseupCallback == "function") {
          this.mouseupCallback(this);
        }
    },
    bindMouseEvent: function (obj, mousedownFn, mousemoveFn, mouseupFn) {
        this.mousedownCallback = mousedownFn;
        this.mousemoveCallback = mousemoveFn;
        this.mouseupCallback   = mouseupFn;

        obj.addEventListener("mousedown" , this.mouseDownHandler , false);
        obj.addEventListener("touchstart", this.touchStartHandler, false);
    },
    bindDocumentMouseEvent: function () {
        document.addEventListener("mousemove", this.mouseMoveHandler, false);
        document.addEventListener("mouseup"  , this.mouseUpHandler  , false);
        document.addEventListener("touchmove", this.touchMoveHandler, false);
        document.addEventListener("touchend" , this.touchEndHandler , false);
    },
    unbindDocumentMouseEvent: function () {
        document.removeEventListener("mousemove", this.mouseMoveHandler, false);
        document.removeEventListener("mouseup"  , this.mouseUpHandler  , false);
        document.removeEventListener("touchmove", this.touchMoveHandler, false);
        document.removeEventListener("touchend" , this.touchEndHandler , false);
    }
}

export default touch
