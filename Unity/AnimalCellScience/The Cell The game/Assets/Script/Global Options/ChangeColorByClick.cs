using UnityEngine;

[RequireComponent(typeof(SpriteRenderer))]
public class ChangeColorByClick : MonoBehaviour
{
    private SpriteRenderer spriteRenderer;

    [Header("Color Settings (0 to 1)")]
    [Range(0f, 1f)] public float red = 1f;
    [Range(0f, 1f)] public float green = 1f;
    [Range(0f, 1f)] public float blue = 1f;
    [Range(0f, 1f)] public float alpha = 1f;

    void Awake()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    void OnMouseDown()
    {
        // Set the sprite's color based on the input values
        spriteRenderer.color = new Color(red, green, blue, alpha);
    }
}
