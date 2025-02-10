from django.urls import path
from .views import TodoView


urlpatterns = [
    path('todo/', TodoView.as_view(), name='todo-list'),
    path('todo/<int:id>/', TodoView.as_view(), name='todo-detail'),
]
