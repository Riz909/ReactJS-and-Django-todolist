from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TodoItem
from .serializers import TodoItemSerializer 


# Create your views here.
class TodoView(APIView):
    def get(self, request, id=None):
        if id: 
            try:
                todo_item = TodoItem.objects.get(id=id)
                serialize = TodoItemSerializer(todo_item)
                return Response(serialize.data)
            except TodoItem.DoesNotExist:
                return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            todo = TodoItem.objects.all()
            serializer  = TodoItemSerializer(todo,many=True)
            return Response(serializer.data)
            
    def post(self, request):
        serializer = TodoItemSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try:
            todo_item = TodoItem.objects.get(id=id)
            todo_item.delete()
            return Response({"message": "Todo item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except TodoItem.DoesNotExist:
            return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            todo_item = TodoItem.objects.get(id=id)

            serializer = TodoItemSerializer(todo_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Todo item updated successfully"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except TodoItem.DoesNotExist:
            return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, id):
        try:
            iscomplete = request.data.get('complete')
        
            todo_item = TodoItem.objects.get(id=id)
            todo_item.complete = iscomplete
            todo_item.save()    

            return Response({"message": "Todo item updated successfully"}, status=status.HTTP_200_OK)
        except TodoItem.DoesNotExist:
            return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)
