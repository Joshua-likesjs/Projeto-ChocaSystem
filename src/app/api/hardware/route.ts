import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, get } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const bodyVPJS = await request.json();
    const { userIdVPJS, actionVPJS, dataVPJS } = bodyVPJS;

    if (!userIdVPJS || !actionVPJS) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const database = getDatabase();
    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}`);
    const snapshotVPJS = await get(userRefVPJS);

    if (!snapshotVPJS.exists()) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const userDataVPJS = snapshotVPJS.val();
    const atuadoresVPJS = userDataVPJS.atuadoresVPJS || {};
    const sensoresVPJS = userDataVPJS.sensoresVPJS || {};

    let responseVPJS = {};

    switch (actionVPJS) {
      case 'read_sensors':
        responseVPJS = {
          action: 'sensor_data',
          data: {
            temperature: sensoresVPJS.temperaturaVPJS || 25.0,
            humidity: sensoresVPJS.umidadeVPJS || 60.0,
            light: sensoresVPJS.luminosidadeVPJS || 300,
            presence: sensoresVPJS.presencaVPJS ? 1 : 0
          }
        };
        break;

      case 'control_actuator':
        const { actuatorVPJS, stateVPJS } = dataVPJS || {};
        
        if (!actuatorVPJS || stateVPJS === undefined) {
          return NextResponse.json(
            { error: 'Dados do atuador incompletos' },
            { status: 400 }
          );
        }

        if (actuatorVPJS === 'heater') {
          responseVPJS = {
            action: 'actuator_control',
            actuator: 'heater',
            state: stateVPJS ? 1 : 0,
            status: 'success'
          };
        } else if (actuatorVPJS === 'humidifier') {
          responseVPJS = {
            action: 'actuator_control',
            actuator: 'humidifier',
            state: stateVPJS ? 1 : 0,
            status: 'success'
          };
        } else {
          return NextResponse.json(
            { error: 'Atuador inválido' },
            { status: 400 }
          );
        }
        break;

      case 'get_status':
        responseVPJS = {
          action: 'system_status',
          data: {
            heaters: atuadoresVPJS.aquecedorVPJS ? 1 : 0,
            humidifiers: atuadoresVPJS.umidificadorVPJS ? 1 : 0,
            sensors: {
              temperature: sensoresVPJS.temperaturaVPJS || 25.0,
              humidity: sensoresVPJS.umidadeVPJS || 60.0,
              light: sensoresVPJS.luminosidadeVPJS || 300,
              presence: sensoresVPJS.presencaVPJS ? 1 : 0
            },
            system: {
              uptime: Math.floor(Date.now() / 1000),
              mode: 'auto',
              errors: 0
            }
          }
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Ação inválida' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      ...responseVPJS,
      timestamp: new Date().toISOString()
    });

  } catch (errorVPJS) {
    console.error('Erro na API de hardware:', errorVPJS);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdVPJS = searchParams.get('userId');
    const actionVPJS = searchParams.get('action');

    if (!userIdVPJS || !actionVPJS) {
      return NextResponse.json(
        { error: 'Parâmetros incompletos' },
        { status: 400 }
      );
    }

    const database = getDatabase();
    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}`);
    const snapshotVPJS = await get(userRefVPJS);

    if (!snapshotVPJS.exists()) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const userDataVPJS = snapshotVPJS.val();
    const atuadoresVPJS = userDataVPJS.atuadoresVPJS || {};
    const sensoresVPJS = userDataVPJS.sensoresVPJS || {};

    let responseVPJS = {};

    switch (actionVPJS) {
      case 'status':
        responseVPJS = {
          heaters: atuadoresVPJS.aquecedorVPJS ? 1 : 0,
          humidifiers: atuadoresVPJS.umidificadorVPJS ? 1 : 0,
          sensors: {
            temperature: sensoresVPJS.temperaturaVPJS || 25.0,
            humidity: sensoresVPJS.umidadeVPJS || 60.0,
            light: sensoresVPJS.luminosidadeVPJS || 300,
            presence: sensoresVPJS.presencaVPJS ? 1 : 0
          }
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Ação inválida' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      ...responseVPJS,
      timestamp: new Date().toISOString()
    });

  } catch (errorVPJS) {
    console.error('Erro na API de hardware:', errorVPJS);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}