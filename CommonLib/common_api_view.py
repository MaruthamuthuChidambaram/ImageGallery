from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status


class SoftDeleteMixin(mixins.DestroyModelMixin):
    """ As we are deleting soft """

    def soft_delete(self, request, *args, **kwargs):
        instance = self.queryset.get(id=kwargs.get('pk'))
        instance.is_delete = True
        instance.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class CommonAPIList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    """
    List all the details of the Resource or create a new Resource.
    """
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CommonAPIDetails(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, SoftDeleteMixin, generics.GenericAPIView):
    """
    Details all the Particular Resource or update or delete a Existing Resource.
    """
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.soft_delete(request, *args, **kwargs)


def name_validation(name, is_upper_lower=None):
    name = name.strip()
    if is_upper_lower == 'UPPER':
        name = name.upper()
    elif is_upper_lower == 'LOWER':
        name = name.lower()
    return name