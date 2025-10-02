import { useCallback, useRef } from "react";
import { useEditStore } from "../stores/editStore";
import { useMapStore } from "../stores/mapStore";
import { CELL_SIZE } from "../types/constants";
import type { Point } from "../types/module";

export const useMapEditor = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const lastEditedCell = useRef<Point | null>(null);
  const { config, moveStart, moveEnd, drawPath, drawWall, toggleEnemy } =
    useMapStore();
  const { editMode, isEditing, startEditing, stopEditing } = useEditStore();

  /*
   * 生成したマップを手動で編集するために座標情報を取得する
   * SVG座標からグリッド座標に変換する
   */
  const getGridCoordinates = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      if (!svgRef.current) return null;

      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      // SVG描画領域
      const viewBoxWidth = config.width * CELL_SIZE;
      const viewBoxHeight = config.height * CELL_SIZE;

      // マウス座標をSVG座標系に変換
      const scaleX = viewBoxWidth / rect.width;
      const scaleY = viewBoxHeight / rect.height;

      const svgX = (event.clientX - rect.left) * scaleX;
      const svgY = (event.clientY - rect.top) * scaleY;

      const gridX = Math.floor(svgX / CELL_SIZE);
      const gridY = Math.floor(svgY / CELL_SIZE);

      // 範囲チェック
      if (
        0 < gridX &&
        gridX < config.width &&
        0 < gridY &&
        gridY < config.height
      ) {
        const coord: Point = { x: gridX, y: gridY };
        return coord;
      }

      return null;
    },
    [config.width, config.height],
  );

  /**
   * セルの編集処理（同じセルへの連続編集を防止する）
   */
  const handleCellEdit = useCallback(
    (coord: Point) => {
      if (
        lastEditedCell.current?.x === coord.x &&
        lastEditedCell.current?.y === coord.y
      ) {
        return;
      }
      lastEditedCell.current = coord;

      switch (editMode) {
        case "start":
          moveStart(coord);
          break;
        case "end":
          moveEnd(coord);
          break;
        case "path":
          drawPath(coord);
          break;
        case "wall":
          drawWall(coord);
          break;
        case "enemy":
          toggleEnemy(coord);
          break;
        default:
          break;
      }
    },
    [editMode, moveStart, moveEnd, drawPath, drawWall, toggleEnemy],
  );

  /**
   * クリック時の処理（処理は選択中の編集モード）
   */
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      if (editMode === "none") return;
      const coord = getGridCoordinates(event);
      if (coord) {
        lastEditedCell.current = null;
        startEditing();
        handleCellEdit(coord);
      }
    },
    [editMode, getGridCoordinates, handleCellEdit, startEditing],
  );

  /**
   * Path/Wallの描画
   */
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      if (!isEditing || editMode === "none") return;
      const coord = getGridCoordinates(event);
      if (coord) {
        handleCellEdit(coord);
      }
    },
    [isEditing, editMode, getGridCoordinates, handleCellEdit],
  );

  /**
   * マウスを離したときの処理
   */
  const handleMouseUp = useCallback(() => {
    if (isEditing) {
      stopEditing();
      lastEditedCell.current = null;
    }
  }, [isEditing, stopEditing]);

  const handleMouseLeave = useCallback(() => {
    if (isEditing) {
      stopEditing();
      lastEditedCell.current = null;
    }
  }, [isEditing, stopEditing]);

  // セルのカーソルスタイルを決定
  const getCursorStyle = useCallback(() => {
    if (editMode === "none") return "default";
    if (editMode === "start" || editMode === "end") return "pointer";
    if (editMode === "path" || editMode === "wall") return "crosshair";
    if (editMode === "enemy") return "pointer";
    return "default";
  }, [editMode]);

  return {
    svgRef,

    // イベントハンドラ
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },

    getCursorStyle,
  };
};
