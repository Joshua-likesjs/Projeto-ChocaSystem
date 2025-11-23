import { NextRequest, NextResponse } from 'next/server';
import { database, ref, set, get } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const bodyVPJS = await request.json();
    const { userIdVPJS, sensorDataVPJS } = bodyVPJS;

    if (!userIdVPJS || !sensorDataVPJS) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }


    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}/sensoresVPJS`);

    await set(userRefVPJS, {
      luminosidadeVPJS: sensorDataVPJS.luminosidadeVPJS || 0,
      presencaVPJS: sensorDataVPJS.presencaVPJS || false,
      umidadeVPJS: sensorDataVPJS.umidadeVPJS || 0,
      temperaturaVPJS: sensorDataVPJS.temperaturaVPJS || 0,
      ultimaAtualizacaoVPJS: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Dados dos sensores atualizados com sucesso' 
    });

  } catch (errorVPJS) {
    console.error('Erro ao atualizar sensores:', errorVPJS);
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

    if (!userIdVPJS) {
      return NextResponse.json(
        { error: 'UserId não fornecido' },
        { status: 400 }
      );
    }

  
    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}/sensoresVPJS`);
    const snapshotVPJS = await get(userRefVPJS);

    if (!snapshotVPJS.exists()) {
      return NextResponse.json(
        { 
          luminosidadeVPJS: 0,
          presencaVPJS: false,
          umidadeVPJS: 0,
          temperaturaVPJS: 0
        }
      );
    }

    return NextResponse.json(snapshotVPJS.val());

  } catch (errorVPJS) {
    console.error('Erro ao obter sensores:', errorVPJS);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}