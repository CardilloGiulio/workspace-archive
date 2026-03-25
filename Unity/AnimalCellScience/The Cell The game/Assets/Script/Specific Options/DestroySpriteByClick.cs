using UnityEngine;

public class DestroySpriteByClick : MonoBehaviour
{
    // Called by Unity when the user clicks on this object's collider
    void OnMouseDown()
    {
        Destroy(gameObject);
    }
}
