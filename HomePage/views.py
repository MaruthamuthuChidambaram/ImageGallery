from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.core.paginator import Paginator
from django.template.loader import render_to_string
from django.http.response import HttpResponse

from .models import *
from .serializer import *
from CommonLib.common_api_view import CommonAPIList, CommonAPIDetails
import logging, json
errorlogger = logging.getLogger('error_logger')
from django.shortcuts import render_to_response
from django.conf import settings
from django.db.models import F


# Create your views here.
class ImageListView(TemplateView):
    ''' 
    To Class Pages View Site loaded. And also check the image authentication
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse or Redirect the another URL
    @author: Maruthamuthu Chidambaram
    '''
    template_name = 'HomePage/image_list_view.html'
    def get(self, request, *args, **kwargs):
        context = super(ImageListView, self).get_context_data(**kwargs)
        page = int(request.GET.get('page', 1))
        page = page if page>0 else 1
        category =  Category.objects.all().order_by('id')
        search_action = request.GET.get("search_action") if request.GET.get("search_action") else "0"

        image_list = ImageManagement.objects.all().order_by('-id')
        if search_action != "0":
            image_list = image_list.filter(category=search_action)

        paginator = Paginator(image_list, settings.PAGINATION_COUNT)
        images = paginator.page(page)
        context["images"] = images
        context["category"] = category
        if request.is_ajax():
            html = render_to_string('HomePage/image_table_view.html',{"images": images})
            return HttpResponse(json.dumps({'html':html}))
        else:
            return self.render_to_response(context)

    def dispatch(self, *args, **kwargs):
        return super(ImageListView, self).dispatch(*args, **kwargs)


class ImageAddView(TemplateView):
    ''' 
    To Class Pages View Site loaded. And also check the image authentication
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse or Redirect the another URL
    @author: Maruthamuthu Chidambaram
    '''

    template_name = 'HomePage/image_add_view.html'
    def get(self, request, *args, **kwargs):
        context = super(ImageAddView, self).get_context_data(**kwargs)
        category =  Category.objects.all().order_by('id')
        page = int(request.GET.get('page', 1))
        context['category'] = category
        context['page'] = page
        if kwargs:
            image_instance = ImageManagement.objects.get(pk=kwargs["pk"])
            image = ImageSerializer(image_instance)
            context['image'] = image.data
            context['action'] = "Edit"
        else:
            context['action'] = "Add"
        return self.render_to_response(context)

    def dispatch(self, *args, **kwargs):
        return super(ImageAddView, self).dispatch(*args, **kwargs)

class ImageList(CommonAPIList):
    queryset = ImageManagement.objects.all().order_by('-modified_date')
    serializer_class = ImageSerializer
    
class ImageDetails(CommonAPIDetails):
    queryset = ImageManagement.objects.all().order_by('-modified_date')
    serializer_class = ImageSerializer