   /*
            makeMeDraggable function makes the element draggable.
            It takes various attributes 
            */
            function makeMeDraggable(){
                $("[name^='draggable']").draggable({
                    containment:"table",
                    appendTo:"body",
                    clone:"true",
                    revert:"invalid",
                    helper:"clone",
                    start:function(event,ui){
                        console.log("dragging started");
                    },
                    drag:function(event,ui){    
                         console.log("dragged");
                        $(ui.helper[0]).children().each(function(i){
                            $(this).addClass("styleForDraggedElement");
                        });
                    },
                    stop:function(event,ui){
                        console.log("stopped dragging");
                    }
                });              
            }
            /*
            makeMeDroppable function makes the element droppable
            1) It is called when an element is dropped over an element
            2) It updates the dom in the front end
            3) It internally calls "stickElement" function which updates the dom
               so the user sees the dragged element is sticked above the dragged element
               For eg, if you had  4 animals in below order
                1)Cat
                2)Dog
                3)Elephant
                4)Lion

                and you dragged "Lion" and dropped it  on top of "Dog" elem, then the new order becomes
                1)Cat
                2)Lion
                3)Dog
                4)Elephant

            */

            function makeMeDroppable(){
                $("[name^='draggable']").droppable({
                    tolerance:'pointer',
                    drop:function(event,ui){                      
                        stickElement($(ui.draggable)[0],$(this)[0]);
                    }
                });              
            }
            /*
            stickElement function sticks the draggedElement before the doppedElement so that
            draggedElement becomes the previous li item/previous sibling of the droppedElement
            */
            function stickElement(draggedElement,droppedElement){
                var prvSiblingOfDroppedElement=droppedElement.previousElementSibling;
                /*Point to remember is that droppedOverElement's previousElementSibling can be null
                if the element being dropped uping was the first child of its parent(wont have any prev element sibling).So to handle this scenario,in case where there is no previous element sibling, look for the droppedOverElement's parent and then do a prepend and attach the dragged Element.Doing so will make the draggedElement as the first child*/
                if(prvSiblingOfDroppedElement==null){
                    droppedElement.parentElement.prepend(draggedElement);
                }
                else{
                    
                    prvSiblingOfDroppedElement.after(draggedElement);
                }
            }