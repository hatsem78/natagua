#! -.- coding: utf-8 -.-
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.shortcuts import redirect


# Create your views here.
from django.template.loader import render_to_string
from django.urls import reverse
from django.views import generic, View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView


from django.contrib.auth import authenticate, login, logout

from natagua import settings


@login_required
def index(request):
    return render(request, 'index.html',)


class Turnos(View):

    def get(self, request, *args, **kwargs):

        data_parameter = request.GET

        '''html = render_to_string(
            'booking/passenger_list_pdf/passenger_list_confirmed.html',
            {
                'list': '',
                'titleExtension1': '',
                'titleExtension2': '',
            }
        )'''
        return render(request, 'turno/turno.html', )

    def post(self, request, *args, **kwargs):


        data_parameter = json.loads(request.POST['to_excel_report_filter_option'])

        info = self._info(request)

        name_file = _('ListadoPasajerosConfirmados') + '_' + _('Vuelo') + '_' + data_parameter[
            'flight_number'] + '_' + correct_date(self, data_parameter['date'].upper()) + '.xls'

        response = HttpResponse(content_type="application/ms-excel")
        response['Content-Disposition'] = 'attachment; filename=' + name_file

        date_origin = datetime.datetime.strptime(info['dateflight'], '%d%b%y')

        title = 'FTL: ' + info['flightcarrier'] + ' ' +  _(u'VUELO:') \
                + ' ' + info['flightnumber'] + ' ' + info['origin'] + ' ' \
                + str(date_origin.strftime('%a %d%b%y').upper()) + ' ' + info['daysleft'] + 'D ' \
                + _('Listado Pasajeros Confirmados')

        name_solapa = str(_(u'ListadoPasajerosConfirmados'))


        wb = xlwt.Workbook(style_compression=2)
        sheet = wb.add_sheet(name_solapa)

        col_idx, line_idx = 0, 1

        sheet.write_merge(0, 0, 3, 6, str(title),
                          style=xlwt.Style.easyxf("font: bold on;"))

        sheet.write(1, 1, _(u'#'), style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 2, _(u'CÓDIGO'), style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 3, _(u'NOMBRE'), style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 4,'CL', style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 5, _(u'ESTADO'), style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 6, _(u'TK'), style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 7, data_parameter['titleExtension1'], style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        sheet.write(1, 8, data_parameter['titleExtension2'], style=xlwt.Style.easyxf("font: bold on; align: horiz center;"))
        for file in info['segmentdetail']:
            line_idx += 1
            sheet.write(line_idx, 0, file['boardingpoint'] + '-' + file['boardingoff'],
                        style=xlwt.Style.easyxf("align: horiz center"))
            #recorremos todos los items por tramaos
            for item in file['paxlist']:
                line_idx += 1
                sheet.write(line_idx, 1, item['item'], style=xlwt.Style.easyxf("align: horiz left"))
                sheet.write(line_idx, 2, item['recordlocator'], style=xlwt.Style.easyxf("align: horiz left"))
                sheet.write(line_idx, 3, item['paxsurname'] + '/' + item['paxname'],
                            style=xlwt.Style.easyxf("align: horiz left"))
                sheet.write(line_idx, 4, item['class'] ,style=xlwt.Style.easyxf("align: horiz center"))
                sheet.write(line_idx, 5, parser_status(item['pnr_status']),
                            style=xlwt.Style.easyxf("align: horiz center"))
                sheet.write(line_idx, 6, item['ticket'], style=xlwt.Style.easyxf("align: horiz center"))
                if('EX1' in data_parameter):
                    sheet.write(line_idx, 7, self.parser_extension(item, data_parameter['EX1']),
                                style=xlwt.Style.easyxf("align: horiz left"))
                else:
                    sheet.write(line_idx, 7, '', style=xlwt.Style.easyxf("align: horiz center"))
                if ('EX2' in data_parameter):
                    sheet.write(line_idx, 8, self.parser_extension(item, data_parameter['EX2']),
                                style=xlwt.Style.easyxf("align: horiz left"))
                else:
                    sheet.write(line_idx, 8, '', style=xlwt.Style.easyxf("align: horiz center"))

        wb.save(response)

        return response


class Transportista(View):

    def get(self, request, *args, **kwargs):

        data_parameter = request.GET
        return render(request, 'transportista/transportista.html',)

class Profesor(View):

    def get(self, request, *args, **kwargs):

        data_parameter = request.GET
        return render(request, 'profesor/profesor.html',)