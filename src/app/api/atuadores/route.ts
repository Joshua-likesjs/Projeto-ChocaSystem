import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, set, get, update } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const bodyVPJS = await request.json();
    const { userIdVPJS, atuadorDataVPJS } = bodyVPJS;

    if (!userIdVPJS || !atuadorDataVPJS) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const database = getDatabase();
    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}/atuadoresVPJS`);

    await update(userRefVPJS, {
      aquecedorVPJS: atuadorDataVPJS.aquecedorVPJS !== undefined ? atuadorDataVPJS.aquecedorVPJS : false,
      umidificadorVPJS: atuadorDataVPJS.umidificadorVPJS !== undefined ? atuadorDataVPJS.umidificadorVPJS : false,
      ultimaAtualizacaoVPJS: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Dados dos atuadores atualizados com sucesso',
      atuadoresVPJS: {
        aquecedorVPJS: atuadorDataVPJS.aquecedorVPJS,
        umidificadorVPJS: atuadorDataVPJS.umidificadorVPJS
      }
    });

  } catch (errorVPJS) {
    console.error('Erro ao atualizar atuadores:', errorVPJS);
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

    const database = getDatabase();
    const userRefVPJS = ref(database, `usuarios/${userIdVPJS}/atuadoresVPJS`);
    const snapshotVPJS = await get(userRefVPJS);

    if (!snapshotVPJS.exists()) {
      return NextResponse.json({
        aquecedorVPJS: false,
        umidificadorVPJS: false
      });
    }

    return NextResponse.json(snapshotVPJS.val());

  } catch (errorVPJS) {
    console.error('Erro ao obter atuadores:', errorVPJS);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}