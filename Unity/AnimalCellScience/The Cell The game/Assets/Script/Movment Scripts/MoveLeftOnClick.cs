using NUnit.Framework;
using UnityEngine;
using static UnityEngine.GraphicsBuffer;

public class MoveLeftOnClick : MonoBehaviour
{
    [Tooltip("The amount to move the target on the X axis when clicked.")]
    public float deltaX = 10f;

    [Tooltip("Drag the GameObject you want to move here.")]
    public GameObject orb1;
    public GameObject orb2;
    public GameObject orb3;
    public GameObject orb4;


    void OnMouseDown()
    {
        if (orb1 != null)
        {
            Vector3 pos = orb1.transform.position;
            pos.x -= deltaX;
            orb1.transform.position = pos;
        }
        else
        {
            Debug.LogWarning("MoveRightOnClick: No target assigned!");
        }

        if (orb2 != null)
        {
            Vector3 pos = orb2.transform.position;
            pos.x -= deltaX;
            orb2.transform.position = pos;
        }
        else
        {
            Debug.LogWarning("MoveRightOnClick: No target assigned!");
        }

        if (orb3 != null)
        {
            Vector3 pos = orb3.transform.position;
            pos.x -= deltaX;
            orb3.transform.position = pos;
        }
        else
        {
            Debug.LogWarning("MoveRightOnClick: No target assigned!");
        }

        if (orb4 != null)
        {
            Vector3 pos = orb4.transform.position;
            pos.x -= deltaX;
            orb4.transform.position = pos;
        }
        else
        {
            Debug.LogWarning("MoveRightOnClick: No target assigned!");
        }
    }
}
